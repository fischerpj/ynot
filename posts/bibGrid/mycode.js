//import bbb from './books.json' with { type: 'json'};

// FUNCTIONS are in BibleBooksCodes.js, a Module handling BibleBooksCodes functions.
import BibleBooksCodes from './BibleBooksCodes.js';

// DATA is imported from BibleBooksCodes_Tables.js
const BBC = new BibleBooksCodes();
//	console.log(BBC.whoami_());
const BBClist	= BBC.getBBBlist();
const BBCsample = BBC.getBBBsample_(2);
const BBCshort = BBC.getBBBshort_(BBCsample);
const BBCosis = BBC.getBBBosis_(BBCsample);
const BBCmax = BBC.getBBBmax_(BBCsample);
const BBCurl = BBC.getBBBurl_(BBCsample);
/*
console.log(BBCshort); 
console.log(BBCosis); 
console.log(BBCmax); 
console.log(BBCurl); 
*/
const BBCabbr = BBC.getAllReferenceAbbreviations();
console.log(BBC.getBBBFromText("g"));

//	console.log(BBC.getAllBibleditBooksCodeNumberTriples());
	
// GUESS
//console.log(BBC.getBBBFromText("gn"));	
//console.log(BBC.getBBBFromText("jam"));	

async function fetch_parallel(urls) {
  try {
    const fetchPromises = urls.map(async url => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      const data = await res.json();
      return data.content+data.duration;
    });
    const htmlResults = await Promise.all(fetchPromises);
    return htmlResults;
  } catch (error) {
    console.error("One or more fetch operations failed:", error);
    throw error;
  }
}


fetch_parallel(BBCurl)
  .then(responses => {
		console.log(responses);
  });

/*	
function BBCreduced_(bbbCanon= BibleBooksCodesCanonical_()){
	// INIT 
	const bbbDict = {};

	// LOOP
	for (const BBB of bbbCanon) {
		console.log(BBB);
		const shortAbb =  bbb.getShortAbbreviation(BBB);
		const osis =  bbb.getOSISAbbreviation(BBB);
//	typicalSection
//	referenceNumber
		bbbDict[BBB] = { 
			'short': shortAbb,
			osis : bbb.getOSISAbbreviation(BBB),
			usfm: bbb.getUSFMAbbreviation(BBB),
			sword: bbb.getSwordAbbreviation(BBB),
			net: bbb.getNETBibleAbbreviation(BBB),
			refNumber: bbb.getReferenceNumber(BBB),
			section: bbb.getTypicalSection(BBB),
			maxChap: bbb.getExpectedChaptersList(BBB),
			bookNameEnglish: bbb.getEnglishName_NR(BBB)
		};
	}	
}


// result
//console.log(BBCreduced_());

/*
const bbbCanonFull = bbbCanon.map(
	BBB => {
	  const record = bbb._getFullEntry(BBB);
	  const shortAbb = bbb.getShortAbbreviation(BBB);
	  const result = {};
	  result[BBB] = record;
	return result
	}
);
*/
/*
const refAbbDict = bbb.dataDicts["referenceAbbreviationDict"];
*/
/*
for (let [key, value] of Object.entries(refAbbDict)[0]) {
	console.log(key, value["shortAbbreviation"]);
}


// const entries = Object.fromEntries(Object.entries(bbb.dataDicts["referenceAbbreviationDict"])).slice(0,66);
const entries = Object.fromEntries(refAbbDict);
//console.log(entries);
*/


//console.log(bbbCanonFull);
/*
const bbbOsis = bbb.getAllOSISBooksCodes();
// console.log(bbbOsis);

const record = bbb._getFullEntry("SA1");
//console.log(record);
*/