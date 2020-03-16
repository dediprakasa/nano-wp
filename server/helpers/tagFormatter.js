module.exports = {
  tagFormatter(tags) {
    if (!tags) return
    let rawTags = tags.trim().split(',')
    let formattedTags = rawTags.map(tag => {
      return tag.trim().replace(/[`@|=!&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g,'')
    })
    return formattedTags
  }
}