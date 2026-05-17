import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function registerTestUser() {
  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        "test@opheflow.com",
        "12345678"
      );

    console.log("User created:", userCredential.user);

  } catch (error) {
    console.error(error);
  }
}