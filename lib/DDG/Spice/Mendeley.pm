package DDG::Spice::Mendeley;
# ABSTRACT: Returns top 5 hits from Mendeley database of research articles.

use DDG::Spice;

triggers startend => 'mendeley';

spice to => 'http://api.mendeley.com/oapi/documents/search/$1/?consumer_key={{ENV{DDG_SPICE_MENDELEY_APIKEY}}}';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
    return $_;
    return '' if $_ eq '';
    return;
};

1;
