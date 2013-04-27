function ddg_spice_mendeley(request) {
  // Get query and exclude the trigger.
  var query = DDG.get_query().replace(/mendeley/i, "");

  // Get number of results.
  var total = request['total_results'];

  if (total > 0) {
    var docs = request['documents']
    var limit = 5;
    if (docs.length < 5) {
      limit = docs.length;
    }

    // Create object for results.
    var results = '<div>'
                + '<ol style="padding-top:0.5em;">';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its variables.
      var doc = docs[i];
      var uuid = doc['uuid'];
      var title = doc['title'];
      var author_list = doc['authors'];
      var authors = [];
      var authors_display = '';
      
      // Build author list.
      for (var j = 0; j < author_list.length; j++) {
        var author = author_list[j];
        authors.push(author['forename'] + ' ' + author['surname']);
      }
      // Author list trimmed for more than 3 authors.
      if (author_list.length > 3) {
        authors_display = authors.splice(0, 3).join(', ') + ', et al';
      } else {
        authors_display = authors.join(', ');
      }

      var journal = doc['publication_outlet'];
      var year = doc['year'];
      var url = doc['mendeley_url'];
      var doi = doc['doi'];

      // Write article citation.
      results += '<li style="padding-bottom:0.5em;">';
      
      // Title, has to exist.
      results += '<a href="' + url + '" style="">'
              + '<span style="">' + title + '</span></a><br>';

      results += '<span style="color:#444444;font-size:0.8em;">' + authors_display + '.</span> ';

      // Journal, only add if it is defined.
      if (journal) {
        results += '<span style="color:#444444;font-style:italic;font-size:0.8em;">' + journal + '</span> ';
      } 

      // Publication date and year.
      results += '<span style="color:#444444;font-size:0.8em;">(' + year + ')</span>';

      // Close up citation.
      results += '</li>';

    };

    // Finish results.
    results += '</ol>'
            + '</div>';

    // Define callback items.
    var items = [[]];
    items[0] = {
      a: results,
      h: query + ' (Mendeley)',
      s: 'Mendeley',
      u: 'http://www.mendeley.com/research-papers/search/?query=' + query,
      force_big_header: true,
    }
    nra(items);
  }
}
