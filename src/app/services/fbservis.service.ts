import { Ilan } from './../models/Ilan';
import { Kategori } from './../models/Kategori';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, getDoc, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider } from '@firebase/auth';
import { collection } from '@firebase/firestore';
import { from, switchMap, of, Observable, concatMap, take, map } from 'rxjs';
import { Uye } from '../models/Uye';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) { }

  FacebookSignUp() {
    const provider = new FacebookAuthProvider();
    return from(signInWithPopup(this.auth, provider))
  }

  GoogleSignUp() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
  }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }
  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler/"+ uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return deleteDoc(ref);
  }

  KategoriListele() {
    var ref = collection(this.fs, "Kategoriler");
    return collectionData(ref, { idField: 'kategoriId' }) as Observable<Kategori[]>;
  }
  KategoriById(katId: string) {
    var ref = collection(this.fs, 'Kategoriler');
    var Query = query(ref, where('kategoriId', '==', katId));
    return collectionData(Query, { idField: 'kategoriId' }) as Observable<
      Kategori[]
    >;
  }
  KategoriEkle(kategori: Kategori) {
    var ref = collection(this.fs, 'Kategoriler');
    return addDoc(ref, kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    var ref = doc(this.fs, 'Kategoriler/' + kategori.kategoriId);
    return updateDoc(ref, { ...kategori });
  }
  KategoriSil(kategori: Kategori) {
    var ref = doc(this.fs, "Kategoriler/" + kategori.kategoriId);
    return deleteDoc(ref);
  }


  IlanListele() {
    var ref = collection(this.fs, "Ilanlar");
    return collectionData(ref, { idField: 'ilanId' }) as Observable<Ilan[]>;
  }


  IlanById(ilanId: string) {
    var ref = collection(this.fs, "Ilanlar");
    const myQuery = query(
      ref,
      where('ilanId', '==', ilanId)
    );
    return collectionData(myQuery, { idField: 'ilanId' }) as Observable<Ilan[]>;
  }

  IlanByKategoriId(katId: string) {
    var ref = collection(this.fs, 'Ilanlar');
    const myQuery = query(ref, where('kategoriId', '==', katId));
    console.log(ref);
    return collectionData(myQuery, { idField: 'kategoriId' }) as Observable<
      Ilan[]
    >;
  }
  IlanEkle(ilan: Ilan) {
    var ref = collection(this.fs, 'Ilanlar');
    return addDoc(ref, ilan);
  }

  IlanDuzenle(ilan: Ilan) {
    var ref = doc(this.fs, 'Ilanlar/' + ilan.ilanId);
    return updateDoc(ref, { ...ilan });
  }
  IlanSil(ilan: Ilan) {
    var ref = doc(this.fs, "Ilanlar/" + ilan.ilanId);
    return deleteDoc(ref);
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

}