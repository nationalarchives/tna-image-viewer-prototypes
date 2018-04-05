// 	This JavaScript/jQuery snippet changes the image and caption that appear in the global footer. 
//	It has been extracted to a stand-alone file so that it can be shared across applications, 
//	keeping the footer consistent across applications. 
$(document).ready(function(){
	({
		server : "https://www.nationalarchives.gov.uk/",
		imageSource : "images/global/copy-1-263-255-john-horns-easter-eggs.jpg",
		imageDescription : "John Horn's Easter Eggs", 
		linkText : "COPY 1/263 (255)",
		linkHref : "https://www.flickr.com/photos/nationalarchives/40900879851/",
		linkTitle : "External website - opens in new window",
		linkTarget : "_blank",
		init : function() {
			var caption = $('#flickr-caption'), 
				imageContainer = $('#flickr-image'),
				image = imageContainer.find('img'),
				imageLink = imageContainer.find('a');

			caption.text(this.imageDescription);

			imageLink.attr('href', this.linkHref);

			image.attr({'src' : this.server + this.imageSource, 'alt' : this.imageDescription});

			$('<a>', {
				href : this.linkHref,
				title : this.linkTitle,
				text : this.linkText,
				target : this.linkTarget
			}).appendTo(caption).before(' (').after(')');
		}
	}).init();
})