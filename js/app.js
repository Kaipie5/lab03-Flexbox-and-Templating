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
  const myTemplate = $('#horn-template').html()
  const $newSection = $('<section></section>')
  $newSection.html(myTemplate)
  $newSection.find('h2').text(this.keyword)
  $newSection.find('img').attr('src', this.image_url)
  $newSection.find('img').attr('alt', this.title)
  $newSection.find('p').text(this.description)
  $newSection.find('div').text(this.horns)
  $('main').append($newSection)
}

renderSelection = function () {
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
    for (let i = 2; i < hornArray.length + 2; i++) {
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

  $('header').append($newSelector)
}

$.get('./data/page-1.json', data => {
  data.forEach(horn => {
    new Horn(horn).render()
  });
  renderSelection()
})