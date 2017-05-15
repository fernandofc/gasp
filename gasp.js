/* ========================================================================
 * GASP - Google Analytics for Single Page: v0.1.0
 * ======================================================================== */


(function () {

    'use strict';

        window.GASP = function (params) {

            //load GA
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


            var app = this;
            app.name = "GASP";
            app.version = '0.1.0';

            app.params = {
                UA: 'UA-XXXXX-Y',
                debug: false,
                sendPageViewByHash: true,
                sendHitMaxScrollHeight: true
            };

            for (var param in params) {
                app.params[param] = params[param];
            };

            if(app.params.debug)
                console.log("[" + app.name + "] Debug enabled" );
                  


            ga('create', app.params.UA, 'auto');
            ga('send', 'pageview');



          
            // ##################################
            // Hits
            // ##################################

            
            var Hits = function () {

                var hits = this;
              
                var els = document.querySelectorAll('[gasp-action]');
                for(var i = 0; i < els.length; i++){
                  els[i].addEventListener('click', function() {

                      var category = this.getAttribute("gasp-category");
                      var action = this.getAttribute("gasp-action");
                      if(category == null){
                          var yourElm = this;
                          var selector = "[gasp-parent-category]";
                          var elCategory = hits.findParentBySelector(yourElm, selector);
                          if(elCategory != null)
                            category = elCategory.getAttribute("gasp-parent-category");
                      }

                      if((category == null) || (action == null)){
                        console.log("[" + app.name + " > ERROR] Category ou action not found");
                        return;
                      }

                      hits.send(
                        category, 
                        this.getAttribute("gasp-action"), 
                        this.getAttribute("gasp-label") == "*" ? this.text.trim() : this.getAttribute("gasp-label")
                      );
                  });
                }


                hits.maxScroll = 0;

                window.onscroll = function (e) {
                  if(hits.maxScroll < document.body.scrollTop){
                      hits.maxScroll = document.body.scrollTop;
                      if((document.body.scrollTop > 0) && (app.params.sendHitMaxScrollHeight) && (app.params.debug))
                        console.log("[" + app.name + " > scroll] When you close the page, this event will be sent: Quadrant " + hits.calculateQuadrantOfScroll() + " | Percentage: " + hits.calculatePercentageOfScroll() + "%" );
                  }

                  
                }

                hits.sendHitWithMaxScrollHeight = function(e) {
                    if(!e) 
                      e = window.event;

                    if (e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        var percentage = hits.calculatePercentageOfScroll();
                        var quadrant = hits.calculateQuadrantOfScroll();

                        if((document.body.scrollTop > 0) && (app.params.sendHitMaxScrollHeight)){
                            hits.send("GASP.maxScroll", "quadrant" + quadrant, percentage);
                            if(app.params.debug)
                                console.log("[" + app.name + " > scroll] Quadrant " + quadrant + " | Percentage: " + percentage + "%" );
                        }
                    }
                }

                window.onbeforeunload = hits.sendHitWithMaxScrollHeight;  

                hits.calculateQuadrantOfScroll = function(){
                    var percentage = hits.calculatePercentageOfScroll();

                    var quadrant = 0;
                    if(percentage<=25){
                        quadrant = 1;
                    }
                    else if(percentage<=50){
                        quadrant = 2;
                    }
                    else if(percentage<=75){
                        quadrant = 3;
                    }
                    else{ 
                        quadrant = 4;
                    }

                    return quadrant;
                }     

                hits.calculatePercentageOfScroll = function(){
                    var percentage = parseInt((hits.maxScroll + window.innerHeight) * 100 / document.body.scrollHeight);
                    return percentage;
                }   


                hits.collectionHas = function(a, b) { 
                    for(var i = 0, len = a.length; i < len; i ++) {
                        if(a[i] == b) return true;
                    }
                    return false;
                }
                hits.findParentBySelector = function(elm, selector) {
                    var all = document.querySelectorAll(selector);
                    var cur = elm.parentNode;
                    while(cur && !hits.collectionHas(all, cur)) { 
                        cur = cur.parentNode; 
                    }
                    return cur; 
                }


                hits.send = function (category, action, label) {
                    ga('send', 'event', category, action, label);
                    label = label != null ? label : "";
                    if(app.params.debug)
                      console.log("[" + app.name + " > hits] send: " + category + "|" + action + "|" + label);
                }
            }



            // ##################################
            // PageView
            // ##################################

            
            var PageView = function () {

                var pageview = this;

                if(app.params.sendPageViewByHash){
                    window.onhashchange = function() {
                       pageview.send( location.pathname + location.hash );
                    };
                }
                



                pageview.send = function (path) {
                    ga('set', 'page', path);
                    ga('send', 'pageview');

                    if(app.params.debug)
                      console.log("[" + app.name + " > pageView] " + path);
                }
            }




            //
            //  Init
            //

            new Hits ();
            new PageView();




    };




})();

