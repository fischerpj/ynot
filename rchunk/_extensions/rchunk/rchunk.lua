
function Para(elem)
  if #elem.content == 1 and elem.content[1].text == "inject-r-code" then
    local code = pandoc.CodeBlock("cat(summary(mtcars))")
    code.classes = {"r"}
    return code
  end
end