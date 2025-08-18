import { Ref, Books, tidyBBBs, tidyBBB } from "./BibleBooksCodes_Tables.js";

// array of multiple refs to fetch in parallel

  // DATA is imported from BibleBooksCodes_Tables.js
  const BBC = new BibleBooksCodes();
  const BBClist	= BBC.getBBBlist();
  const BBCsample = BBC.getBBBsample_(24);

  const BBCosis = BBC.getBBBosis_(BBCsample);
//  return BBC.getBBBneg_(BBCsample);
  const tibbb = BBCsample.map((x) => tidyBBB(x)+"1:1");
  console.log(tibbb);
  const mi = new Ref(tibbb);
  await mi.fetch_parallel();   // Wait for data to be fetched
  await mi.displayData();
//  BBC.getSingleChapterBooksList() 

//  const BBCneg = BBC.getBBBneg_(BBCsample);
//  return BBC.getBBBFromText(mbcv.book)
//  console.log(BBC.getBBBFromText(mbcv.book));
//  return BBCsample;
//  return BBC.getNEGAbbreviation("GEN")
