## newAPI workflow is add_refs -> add_endpoints_ -> add_json_

#' render_refs_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x dataframe
#' @export
render_refs_ <- function(x= c("ROM2:13!SG21","MAT7:21!SG21","JAM1:22!SG21","LUK6:46!SG21","HEB4:2!SG21","1SA3:10!SG21","1SA3:1!SG21","PSA33:9!SG21","ROM1:19-20!SG21")){
  x |> 
    add_ref_() |>
    add_endpoint_() |>
    add_json_() |>
    get_payload_() |>
    displays_()
}

#' displays_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x dataframe
#' @export
displays_ <- function(x = get_payload_()){
  # Create a Markdown template for each row
  template <- "{{ paste0('- **', df$ref, '**: ', df$content, collapse = '\\n\\n') }}"
  
  ##-------- CRAFT MARKDOWN output
  # Expand the template using knit_expand
  md_body <- knitr::knit_expand(text = template, df = x)
  cat(md_body, sep = "\n")
}

#' get_payload_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x string
#' @export
get_payload_ <-function(x= get_json_()) {
 x$json |> purrr::list_rbind()
}

#' get_json_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x string
#' @export
get_json_ <-function(x= c("gal2:19","rom3:17","ROM2:13!SG21","MAT7:21!SG21","JAM1:22!SG21","LUK6:46!SG21")) {
  miresult <- x |> 
    add_ref_() |>
    add_endpoint_() |>
    add_json_()
  return (miresult)  
}

#' add_json_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x dataframe
#' @export
add_json_ <-function(x= add_endpoint_()) {
  ## add req
  x$req <- x$endpoint |> purrr::map(httr2::request)
  x$resp <- x$req |> purrr::map(httr2::req_perform)
  # Decode the JSON response into an R object (list)
  x$json <- x$resp |> purrr::map(\(xx) {
    yy <- httr2::resp_body_json(xx, simplifyVector = TRUE)
    yy$error <- NULL
    return (tibble::as_tibble(yy))
    })
##  x$payload <- x$json  |> purrr::map(tibble::as_tibble)
  
  return (x)  
}

#' add_endpoint_
#'
#' list of relevant static parsed urls, accessible by alias
#' @param x dataframe
#' @param y string
#' @export
add_endpoint_ <- function(x= add_ref_(), 
                          y='hsub') {
  # urls as BARE strings
  my_str <- c(      
    'bgw' ="https://www.biblegateway.com/passage/?search=John+3&version=NIV",
    'hsub' ="https://hsub.pjafischer.workers.dev/bgw/api/?param=gen1:5!SG21",
    'jsfapi' ="https://jsfapi.netlify.app/.netlify/functions/bgw/?param=gen1!KJV",
    'hall'="https://hall.pjafischer.workers.dev/passage/?param=ps42!NIV"
  )
  
  mybase <- my_str[y]
  
  # add endpoint by Modifying the query string series
  myendpoints <- x |> 
    dplyr::mutate(
      endpoint = mybase,
      endpoint = urltools::param_set(endpoint, "param", ref)
      ) 

  return(myendpoints)
}

add_ref_  <- function(x = c("ROM2:13!SG21","MAT7:21!SG21","JAM1:22!SG21","LUK6:46!SG21","HEB4:2!SG21","1SA3:10!SG21","1SA3:1!SG21","PSA33:9!SG21","ROM1:19-20!SG21","HEB11:3!SG21","JOB38:2!SG21","ACT3:19-20!SG21","LUK11:13!SG21","JOH1:1-12!SG21","JOH2:1-12!SG21","REV19:9!SG21","ROM6:13!SG21","PSA71!SG21","PSA102:17-19!SG21","PSA145:4-5!SG21","DEU6:6-8!SG21","PSA71:17-21!SG21","PSA78:2-8!SG21","PSA42:1!KJV","ISA8:16-18!SG21","PSA16:1!SG21","HEB2:4!SG21","HEB2:12-13!SG21","PSA22:31-32!SG21","GEN1:1!SG21","GEN12:8!SG21","REV4:2!SG21","GAL2:19!SG21","GEN1:2!SG21","GAL2:20!SG21","HEB1:1-2!SG21","JOH1:29!SG21","Gen1:3!SG21","John1:29!SG21","Ps14!SG21","ACT7:52-53!SG21","ACT2:32-35!SG21","MAT22:43-45!SG21","Gal2:20")[1:5]) {
  midf <- tibble::as_tibble(list(ref = x))
  return (midf)
}
