import Product from "#src/models/product.js";
import axios from "axios";

//? todo is this common practice to use another endpoint here?
//recomendation system end
export const getRecommendations = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ id:", id);
  // try {
  const product = await Product.findById(id).populate("category");
  //all products we have
  const products = await Product.find({})
    .select("name description images price")
    .exec();
  const similaritiesRes = similarities(products, product);

  return res.status(200).json({ similaritiesRes });
  // } catch (error) {
  //   return res.status(500).json({ message: "Such product can not be found" });
  // }
};

function calculateTF(term, document) {
  var words = document.split(" ");
  var termCount = words.reduce((acc, word) => {
    return word.toLowerCase() === term.toLowerCase() ? acc + 1 : acc;
  }, 0);
  return termCount / words.length;
}

// Function to calculate inverse document frequency (IDF)
function calculateIDF(term, documents) {
  var docsWithTerm = documents.filter((document) => {
    return document.toLowerCase().split(" ").includes(term.toLowerCase());
  });
  return Math.log(documents.length / (docsWithTerm.length + 1));
}

// Function to calculate TF-IDF
function calculateTFIDF(term, document, documents) {
  var tf = calculateTF(term, document);
  var idf = calculateIDF(term, documents);
  return tf * idf;
}

// Function to calculate cosine similarity between two documents
function calculateCosineSimilarity(document1, document2, documents) {
  var terms = new Set([...document1.split(" "), ...document2.split(" ")]);
  var vector1 = Array.from(terms).map((term) =>
    calculateTFIDF(term, document1, documents)
  );
  var vector2 = Array.from(terms).map((term) =>
    calculateTFIDF(term, document2, documents)
  );

  // Calculate dot product
  var dotProduct = vector1.reduce((acc, value, index) => {
    return acc + value * vector2[index];
  }, 0);

  // Calculate magnitudes
  var magnitude1 = Math.sqrt(
    vector1.reduce((acc, value) => {
      return acc + value * value;
    }, 0)
  );
  var magnitude2 = Math.sqrt(
    vector2.reduce((acc, value) => {
      return acc + value * value;
    }, 0)
  );

  // Calculate cosine similarity
  return dotProduct / (magnitude1 * magnitude2);
}

function processString(input_object) {
  const title_text = input_object.name;
  const description_text = input_object.description.slice(0, 100);
  const full_text = title_text + " " + description_text;
  // Remove HTML tags
  const withoutHtmlTags = full_text.replace(/<[^>]*>/g, "");

  // Remove punctuation symbols and make lowercase
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  let withoutPunctuation = withoutHtmlTags.replace(punctuationRegex, "");
  let lowercaseString = withoutPunctuation.toLowerCase();
  const withoutPunctuationAndLowercase = lowercaseString;

  // Split the string into words
  const words = withoutPunctuationAndLowercase.split(/\s+/);

  // Remove the last letter from each word and filter out words shorter than 2 characters
  const processedWords = words
    .map((word) => word.slice(0, -1))
    .filter((word) => word.length >= 2);

  // Join the words back into a string

  const result = processedWords.join(" ");

  //   input_object.description = result;
  return result;
}

function getItemObjects(objectArr, documentIndexes, allSimiliarities) {
  let combined = [];
  for (let i = 0; i < allSimiliarities.length; i++) {
    combined.push([allSimiliarities[i], documentIndexes[i]]);
  }
  combined.sort(function (a, b) {
    return b[0] - a[0];
  });
  let top = combined.slice(1, 11);
  let top_ids = top.map((elem) => elem[1]);
  let res = top_ids.map((id1) =>
    objectArr.find(function (element) {
      return element.id == id1;
    })
  );
  return res;
}

function similarities(documents, product) {
  let processedDocuments = documents
    .slice(0, 250)
    .map((doc) => processString(doc));

  let documentIndexes = documents.map((doc) => doc.id);

  let currDoc = processString(product);

  console.time("recommendation system time:");
  let similarityList = processedDocuments.map((doc) =>
    calculateCosineSimilarity(currDoc, doc, processedDocuments)
  );
  console.timeEnd("recommendation system time:");

  let res = getItemObjects(documents, documentIndexes, similarityList);
  return res;
}
