import Product from "#src/models/product.js";
import axios from "axios";

//? todo is this common practice to use another endpoint here?
//recomendation system end
export const getRecommendations = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    const products = await Product.find({}).select("description").exec();

    return res.status(200).json({ product, products });
  } catch (error) {
    return res.status(500).json({ message: "Such product can not be found" });
  }
};

// //Recommendation system
// // Function to calculate term frequency (TF)
// function calculateTF(term, document) {
//   var words = document.split(" ");
//   var termCount = words.reduce((acc, word) => {
//     return word.toLowerCase() === term.toLowerCase() ? acc + 1 : acc;
//   }, 0);
//   return termCount / words.length;
// }

// // Function to calculate inverse document frequency (IDF)
// function calculateIDF(term, documents) {
//   var docsWithTerm = documents.filter((document) => {
//     return document.toLowerCase().split(" ").includes(term.toLowerCase());
//   });
//   return Math.log(documents.length / (docsWithTerm.length + 1));
// }

// // Function to calculate TF-IDF
// function calculateTFIDF(term, document, documents) {
//   var tf = calculateTF(term, document);
//   var idf = calculateIDF(term, documents);
//   return tf * idf;
// }

// // Function to calculate cosine similarity between two documents
// function calculateCosineSimilarity(document1, document2, documents) {
//   var terms = new Set([...document1.split(" "), ...document2.split(" ")]);
//   var vector1 = Array.from(terms).map((term) =>
//     calculateTFIDF(term, document1, documents)
//   );
//   var vector2 = Array.from(terms).map((term) =>
//     calculateTFIDF(term, document2, documents)
//   );

//   // Calculate dot product
//   var dotProduct = vector1.reduce((acc, value, index) => {
//     return acc + value * vector2[index];
//   }, 0);

//   // Calculate magnitudes
//   var magnitude1 = Math.sqrt(
//     vector1.reduce((acc, value) => {
//       return acc + value * value;
//     }, 0)
//   );
//   var magnitude2 = Math.sqrt(
//     vector2.reduce((acc, value) => {
//       return acc + value * value;
//     }, 0)
//   );

//   // Calculate cosine similarity
//   return dotProduct / (magnitude1 * magnitude2);
// }

// // Example usage
// var documents = {
//   doc1: '<p>Balcony pot "Gloria" is convenient for planting various plants (petunia, pelargonium, etc.) made of high-quality polypropylene. Ideal for loggias, balconies, gardens, open terraces. High-quality raw materials ensure the elasticity and strength of the pot. The surface is resistant to sunlight, and also protects the roots well from overheating. The shape of the flowerpots ensures the stability of the structure, which is convenient if the flowerpots are used for outdoor flowers.</p>',
//   doc2: '<div><p>Gloria balcony vase 40*18 cm (granite color)</p> <p>&nbsp; "Gloria" balcony boxes are convenient for placing plants with a small root system of violets, spathiphyllum, Decembrist, fuchsia. Flowerpots are made of high-quality polypropylene. Ideal for loggias and balconies. High-quality raw materials ensure the elasticity and strength of the pot. The surface is resistant to sunlight and also perfectly protects the roots from overheating. A wide range of colors allows you to choose one of 5 color options. The shape of the pots ensures the stability of the structure, which is convenient if the pots are used for outdoor flowers.</p> <p></p> <p>Characteristics:</p> <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Designed for planting indoor plants;</p> <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Made in a classic style and a wonderful range of colors;</p> <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Can be used both indoors and outdoors;</p> <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; It does not come with a stand. There are technological protrusions that can be cut.</p> <p>Material - Polypropylene</p></div>',
//   doc3: "<p>Collar has been a great classic ammo offering for over 20 years.</p><p>Reliability is the hallmark of the <strong>Collar</strong> brand.<br>All products undergo a strict strength control system and are made exclusively from natural materials that are suitable for every pet.</p><p><strong>Collar</strong> has been a sales leader for many years and provides high-quality products at an affordable price.< /p><p>The length of the collar is selected from the girth of the tailed friend's neck, which is determined with a measuring tape. At the same time, it is correct to add from 2 cm (for medium and small breeds) to 5 cm (for large ones) to the obtained result, so that the collar does not rub or squeeze the animal's neck.</p>",
// };

// function processString(input) {
//   // Remove HTML tags
//   const withoutHtmlTags = input.replace(/<[^>]*>/g, "");

//   // Remove punctuation symbols and make lowercase
//   const withoutPunctuationAndLowercase = withoutHtmlTags
//     .replace(/[^\w\s]/g, "")
//     .toLowerCase();

//   // Split the string into words
//   const words = withoutPunctuationAndLowercase.split(/\s+/);

//   // Remove the last letter from each word and filter out words shorter than 3 characters
//   const processedWords = words
//     .map((word) => word.slice(0, -1))
//     .filter((word) => word.length >= 3);

//   // Join the words back into a string
//   const result = processedWords.join(" ");

//   return result;
// }

// function similarities(documents, id) {
//   processedDocuments = documents.map((doc) => processString(doc));
//   currDoc = processedDocuments[id];
//   similarityList = processedDocuments.map((doc) =>
//     calculateCosineSimilarity(currDoc, doc, processedDocuments)
//   );
//   return similarityList;
// }
// //to do write function to grab data from objects

// // Extract keys and values while preserving order
// const [orderedKeys, orderedValues] = Object.entries(initialDictionary).reduce(
//   ([keys, values], [key, value]) => {
//     keys.push(key);
//     values.push(value);
//     return [keys, values];
//   },
//   [[], []]
// );
