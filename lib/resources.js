// library for "resources" firestore collection

// import firebase lib, returns firestore db in firebase var
import firebase from "./firebase";

// returns all valid IDs for getStaticPaths()
export async function getResourceIds() {
  let output = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "resources"
    const snapshot = await firebase.collection("resources").get();
    
    // loop thru and build out an array of all data from firestore collection documents
    snapshot.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        output.push(
          {
            params: {
              id:doc.id
            }
          }
        );
      }
    );
  } catch(error) {
    console.error(error);
  }
  // console.log(output);
  return output;
}

// returns one document's data for matching ID
export async function getResourceData(idRequested) {
  // retrieve ONE document matched by unique id
  const doc = await firebase.collection("resources").doc(idRequested).get();

  // return all data from firestore document as json
  let output;
  if (!doc.empty) {
    output = { id:doc.id, data:doc.data() };
    // now you can do any data validation you want to conduct
    
  } else {
    output = null;
  }

  return output;
}