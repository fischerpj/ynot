expand_message <- function(name, score) {
  template <- "Hello {{name}}, your score is {{score}}."
  cat(knitr::knit_expand(text = template, name = name, score = score))
}

urls_ <- function(x = refs_(), y=  "https://hsub.pjafischer.workers.dev/bgw/api/?param=GAL2%3A20"){
  return(x)
}

refs_ <- function(x = c("ROM2:13!SG21","MAT7:21!SG21","JAM1:22!SG21","LUK6:46!SG21","HEB4:2!SG21","1SA3:10!SG21","1SA3:1!SG21","PSA33:9!SG21","ROM1:19-20!SG21","HEB11:3!SG21","JOB38:2!SG21","ACT3:19-20!SG21","LUK11:13!SG21","JOH1:1-12!SG21","JOH2:1-12!SG21","REV19:9!SG21","ROM6:13!SG21","PSA71!SG21","PSA102:17-19!SG21","PSA145:4-5!SG21","DEU6:6-8!SG21","PSA71:17-21!SG21","PSA78:2-8!SG21","PSA42:1!KJV","ISA8:16-18!SG21","PSA16:1!SG21","HEB2:4!SG21","HEB2:12-13!SG21","PSA22:31-32!SG21","GEN1:1!SG21","GEN12:8!SG21","REV4:2!SG21","GAL2:19!SG21","GEN1:2!SG21","GAL2:20!SG21","HEB1:1-2!SG21","JOH1:29!SG21","Gen1:3!SG21","John1:29!SG21","Ps14!SG21","ACT7:52-53!SG21","ACT2:32-35!SG21","MAT22:43-45!SG21","Gal2:20")){
 return(x)
}