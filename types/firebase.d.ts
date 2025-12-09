import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

declare module "#app" {
  interface NuxtApp {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
      storage: FirebaseStorage;
    };
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
      storage: FirebaseStorage;
    };
  }
}
