// let firstSection = 'section:nth-of-type(0)'
// $(nthSection).hide()

const hornArray = []

function Horn(hornObj) {
  this.keyword = hornObj.keyword
  this.image_url = hornObj.image_url
  this.title = hornObj.title
  this.description = hornObj.description
  this.horns = hornObj.horns

  hornArray.push(this)
}

Horn.prototype.render = function () {
  let source = $("#handlebars-id").html();
  let template = Handlebars.compile(source)
  $('main > article').append(template(this))
}

renderSelection = function() {
  const $newSelector = $('<select></select>')
  const keywordArray = []
  for (let i = 0; i < hornArray.length; i++) {
    if (!keywordArray.includes(hornArray[i].keyword)) {
      keywordArray.push(hornArray[i].keyword)
      let newOption = new Option(hornArray[i].keyword, hornArray[i].keyword)
      $newSelector.append(newOption)
    }
  }
  $newSelector.on('change', function () {
    let keyword = this.value.toLowerCase()
    for (let i = 1; i < hornArray.length + 2; i++) {
      let nthSection = 'section:nth-of-type(' + i + ')'
      // console.log($(nthSection).find('h2').text().toString() === keyword.toString())
      // console.log('nthSection', $(nthSection).find('h2').text().toString())
      // console.log('keyword', keyword.toString())
      if ($(nthSection).find('h2').text().toString() === keyword.toString()) {
        $(nthSection).show()
      } else {
        $(nthSection).hide()
      }
    }
  })

  $('header > div').append($newSelector)
}

let pages = {
  1 : '/data/page-1.json',
  2 : '/data/page-2.json'
}
let currentPageData = 1

setUpNextPageData = function() {
  if (currentPageData < Object.keys(pages).length) {
    currentPageData = currentPageData + 1
    console.log("HAPPENING")
    updatePage(pages[currentPageData], 'Keyword');
  }
}

setUpPreviousPageData = function() {
  if (currentPageData > 1) {
    currentPageData = currentPageData - 1
    console.log("HAPPENING")
    updatePage(pages[currentPageData], 'Keyword');
  }
}

sortCurrentPage = function(sortMethod) {
    updatePage(pages[currentPageData], sortMethod);
}

updatePage = function(dataLink, sortBy) {
  console.log(dataLink)
  $('article').remove();
  $('header > div').remove();
  $('main').append('<article></article>')
  $('header').append('<div></div>');
  $.get(dataLink, data => {
    if (sortBy === 'Horns') {
      data.sort( (a,b) => { 
        return a.horns - b.horns; 
      });
    } else if (sortBy === 'Keyword') {
      data.sort( (a, b) => { 
        if (a.keyword < b.keyword) {
            return -1;
        }
        if (a.keyword > b.keyword ) {
            return 1;
        }
        return 0;
      });
    }
    data.forEach(horn => {
      new Horn(horn).render()
    });
    renderSelection()
  })
}
