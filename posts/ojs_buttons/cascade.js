function getCascadeForElement(el) {
  const results = [];

  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // ignore CORS-protected sheets
    }
    if (!rules) continue;

    for (const rule of rules) {
      if (!rule.selectorText) continue;

      try {
        if (el.matches(rule.selectorText)) {
          results.push({
            selector: rule.selectorText,
            cssText: rule.cssText,
            stylesheet: sheet.href || "inline <style>"
          });
        }
      } catch {
        // invalid selector for matches()
      }
    }
  }

  // inline styles (highest priority)
//  if (el.getAttribute("style")) {
//    results.push({
//      selector: "inline style",
//      cssText: el.getAttribute("style"),
//      stylesheet: "inline"
//    });
//  }

  return results;
}

const btn = document.querySelector("button.btn.btn-quarto"); // or a more specific selector
console.log(btn);
//console.table(getCascadeForElement(btn));

