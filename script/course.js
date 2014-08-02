/*
 * course.js
 *
 * loaded on course pages
 * Modifies the links on a course page so that queries are properly passed along
 *
 * Depends on:
 *      llab loader
 *      jQuery
 */

'use strict';

 /* Create the Query string for links to each topic within a course. */
llab.editURLs = function() {
    var query = {},
        docPath = document.location.pathname;

    // Set the 'course' attribute
    if (docPath.indexOf(llab.courses_path) !== -1) {
        // Exclude the path to the course file because it gets added back later…
        query['course'] = docPath.replace(llab.courses_path, '');
    }

    // TODO: only really supports one container per file.
    // Build the Query string from container attributes
    $(".topic_container").each(function() {
        $.extend(query, llab.getAttributesForElement(this));
        // query = llab.mergeObjects(query, llab.getAttributesForElement(this));
    });

    // FIXME -- this is most surely buggy
    $(".topic_link a").each(function() {
        // Need a better way to check URLs.
        var str = this.href.indexOf('?') === -1 ? '?' : '&';
        this.href += str + llab.queryString.stringify(query);
    });
};

$(document).ready(function() {2
    llab.editURLs();
});