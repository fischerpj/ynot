expand_message <- function(name, score) {
  template <- "Hello {{name}}, your score is {{score}}."
  cat(knitr::knit_expand(text = template, name = name, score = score))
}