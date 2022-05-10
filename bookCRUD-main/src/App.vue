<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>This is book list</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <form>
          <div class="mb-3">
            <label class="form-label">Book Title</label>
            <input
              v-model="bookTitle"
              type="text"
              class="form-control text-black"
            />
            <label class="form-label">Book Price</label>
            <input
              v-model="bookPrice"
              type="text"
              class="form-control text-black"
            />
          </div>
          <button
            v-if="!updateState"
            @click="addBook"
            type="button"
            class="btn btn-primary"
          >
            Add Book
          </button>
          <button
            v-if="updateState"
            @click="updateBook3"
            type="button"
            class="btn btn-success"
          >
            Update Book
          </button>
        </form>
      </div>
      <div class="col-8">
        <div class="row">
          <div
            class="col-6 mt-2"
            v-for="book in ListOfBooks"
            :key="book.bookID"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Title: {{ book.bookTitle }}</h5>
                <p class="card-text">ID: {{ book.bookID }}</p>
                <p class="card-text">Price: {{ book.bookPrice }}</p>
                <button
                  :disabled="updateState"
                  @click="updateBook(book)"
                  class="btn btn-success mr-2"
                >
                  Update
                </button>
                <button
                  :disabled="updateState"
                  @click="deleteBook(book.bookID)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "@/firebaseInit.js";
import {
  collection,
  query,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onMounted } from "vue";

const ListOfBooks = ref([]);
const bookID = ref();
const bookTitle = ref("");
const bookPrice = ref("");
const bookTime = ref("");
const bookTemp = ref({});
const updateState = ref(false);

onMounted(() => {
  const q = query(collection(db, "ListOfBooks"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        ListOfBooks.value.push({
          bookID: change.doc.id,
          bookTitle: change.doc.data().bookTitle,
          bookPrice: change.doc.data().bookPrice,
        });
      } else if (change.type === "modified") {
        const index = ListOfBooks.value.findIndex((Books) => Books.bookID === change.doc.id);
        ListOfBooks.value.splice(index, 1);
        ListOfBooks.value.push({
          bookID: change.doc.id,
          bookTitle: change.doc.data().bookTitle,
          bookPrice: change.doc.data().bookPrice,
        });
      }
    });
  });
});

function addBook() {
  const docRef = addDoc(collection(db, "ListOfBooks"), {
    bookTitle: bookTitle.value,
    bookPrice: bookPrice.value,
    bookTime: serverTimestamp(),
  });
}
function updateBook(bookTmp) {
  updateState.value = true;
  bookTemp.value = bookTmp;
  bookID.value = bookTmp.bookID;
  bookTitle.value = bookTmp.bookTitle;
  bookPrice.value = bookTmp.bookPrice;
  bookTime.value = bookTmp.bookTime;
}
function updateBook3() {
  const bkID = bookID.value;
  const bkt = bookTitle.value;
  const bkp = bookPrice.value;
  const bkTM = bookTime.value;
  const userRef = doc(db, "ListOfBooks", bkID);
  updateDoc(userRef, {
    bookTitle: bkt,
    bookPrice: bkp,
    bookTime: serverTimestamp(),
  });
  updateState.value = false;
}
function deleteBook(id) {
  deleteDoc(doc(db, "ListOfBooks", id)).then(() => {
    const index = ListOfBooks.value.findIndex((Books) => Books.bookID === id);
    ListOfBooks.value.splice(index, 1);
  });
}
</script>
