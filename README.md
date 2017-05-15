# gasp.js
With just one line of javascript code, you can track your site with Google Analytics. Simple and easy. Just insert attributes into html. GASP - Google Analytics for Single Page (or One Page)

----------
### Version
- v0.1.0


### Why use "gasp.js"?

- Pageviews are sent automatically;
- Event occurrences are sent according to the attributes entered in the html file;
- Scrolling height change occurrences are automatically sent as events (in percentage and quadrant);


----------
## Installation
1. include the javascript code on your page: ```<script src="gasp.js"></script>```
2. initialize GASP: ```new GASP({ UA: "UA-XXXXX-Y"});```


	**Options**
	
	| Attributes    | Options           | Default           | Description  |
	| ------------- |:---------------| :---------------| :------------|
	| UA  | *string*| UA-XXXXX-Y | Your Google Analytics tracking code |
	| debug | *boolean*| false | Enables logging in the browser console |
	| sendPageViewByHash  |  *boolean*| true | Send a pageview when there is a hash change in the current url  |
	| sendHitMaxScrollHeight|  *boolean*  | true | Send scroll height occurrences as events, when the user exits the page (in percentage and quadrant) |

	**Example:** `new GASP({ UA: "UA-XXXXX-Y", debug: true, sendPageViewByHash: true, sendHitMaxScrollHeight: true });`


----------
## Event Tracking

Simply enter the attributes "gasp-category", "gasp-action" and "gasp-label" in your html.
 
 \o/
 

-> **Informing the event fields: category, action and label**

    <ul class="menu">
		<li>
			<a href="#home" gasp-category="header" gasp-action="menu" gasp-label="Home">
				Home
			</a>
		</li>
		<li>
			<a href="#contact" gasp-category="header" gasp-action="contact" gasp-label="Contact">
				Contact
			</a>
		</li>
	</ul>



-> **No need to repeat "category"**

    <ul class="menu" gasp-parent-category="header">
		<li>
			<a href="#home" gasp-action="menu" gasp-label="Home">
				Home
			</a>
		</li>
		<li>
			<a href="#contact" gasp-action="contact" gasp-label="Contact">
				Contact
			</a>
		</li>
	</ul>

-> "**Label" is automatically the value of the tag**

    <div class="navbar" gasp-parent-category="header">
		    <ul class="menu">
				<li>
					<a href="#home" gasp-action="menu" gasp-label="*">
						Home
					</a>
				</li>
				<li>
					<a href="#contact" gasp-action="contact" gasp-label="*">
						Contact
					</a>
				</li>
			</ul>
	</div>


----------
## Page Tracking

Sends automatically a pageview hit  to Google Analytics when there is a change in the hash of the URL.


> For example:
> - /index
> - /index#about
> - /index#contact




 *For this it is necessary that "sendPageViewByHash" is true (default: true).*


----------

## Scroll Tracking

Event with the maximum percentage and quadrant of the screen preview.

 - Percentage: up to 100%;
 - Quadrant: up to 4;

    

> Example: If user rolled halfway through the screen:
> - Category: GASP.maxScroll
> - Action:quadrant2
> - Label:50

> Example: if user rolled up 3/4 screen:
> - Category: GASP.maxScroll
> - Action:quadrant3
> - Label:75

 *For this it is necessary that "sendHitMaxScrollHeight" is true (default: true).*

----------
## Questions? Need help?
fernando@fernandofc.com.br
