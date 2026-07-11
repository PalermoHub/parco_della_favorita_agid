
	        var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;

            if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
              highlightLayer.setStyle({
                color: '#ff9900',
              });
            } else {
              highlightLayer.setStyle({
                fillColor: '#ff9900',
                fillOpacity: 0.5
              });
            }
			// mostra popup mouse 
           // .leaflet-top .leaflet-control
        }
		
    var map = L.map('map', {
        zoomControl: false,
        maxZoom: 18,
        minZoom: 13,  // Imposta il minimo zoom a 13
        maxBounds: [
            [38.120, 13.300],  // Coordinate del limite sud-ovest
            [38.220, 13.380]   // Coordinate del limite nord-est
        ],
        maxBoundsViscosity: 1.0 // Impedisce all'utente di spostarsi fuori dai limiti
    }).setView([38.170, 13.343], 13);  // Centra la mappa sul Parco della Favorita con zoom 13
			
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a> - <a href="https://x.com/gbvitrano">by @gbvitrano</a> - ');
        var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
        // remove popup's row if "visible-with-data"
        function removeEmptyRowsFromPopupContent(content, feature) {
         var tempDiv = document.createElement('div');
         tempDiv.innerHTML = content;
         var rows = tempDiv.querySelectorAll('tr');
         for (var i = 0; i < rows.length; i++) {
             var td = rows[i].querySelector('td.visible-with-data');
             var key = td ? td.id : '';
             if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
                 rows[i].parentNode.removeChild(rows[i]);
             }
         }
         return tempDiv.innerHTML;
        }
        // add class to format popup if it contains media
		function addClassToPopupIfMedia(content, popup) {
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML = content;
			if (tempDiv.querySelector('td img')) {
				popup._contentNode.classList.add('media');
					// Delay to force the redraw
					setTimeout(function() {
						popup.update();
					}, 10);
			} else {
				popup._contentNode.classList.remove('media');
			}
		}
<!-- Side panel Right --> 				
		const sidepanelRight = L.control.sidepanel('mySidepanelRight', {
			panelPosition: 'right',
			tabsPosition: 'top',
			pushControls: true,
			darkMode: false,
			startTab: 'tab-dataviz'
		}).addTo(map);

		if (window.innerWidth >= 768) {
			L.DomUtil.addClass(document.getElementById('mySidepanelRight'), 'opened');
			var cc = map.getContainer().querySelector('.leaflet-control-container');
			L.DomUtil.addClass(cc, 'leaflet-anim-control-container');
			L.DomUtil.addClass(cc, 'right-opened');
		}
		
        var measureControl = new L.Control.Measure({
            position: 'bottomleft',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'hectares'
        });
        measureControl.addTo(map);
        document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
        document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
        var bounds_group = new L.featureGroup([]);
        function setBounds() {
            if (bounds_group.getLayers().length) {
                map.fitBounds(bounds_group.getBounds());
            }
            map.setMaxBounds(map.getBounds());
        }
        map.createPane('pane_GoogleHybrid_0');
        map.getPane('pane_GoogleHybrid_0').style.zIndex = 400;
        var layer_GoogleHybrid_0 = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            pane: 'pane_GoogleHybrid_0',
            opacity: 1.0,
            attribution: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
            minZoom: 13,
            maxZoom: 18,
            minNativeZoom: 12,
            maxNativeZoom: 18
        });
        layer_GoogleHybrid_0;
		
        map.createPane('pane_OSMStandard_1');
        map.getPane('pane_OSMStandard_1').style.zIndex = 401;
        var layer_OSMStandard_1 = L.tileLayer('https://{s}.piano.tiles.quaidorsay.fr/ar/{z}/{x}/{y}.png', {
            pane: 'pane_OSMStandard_1',
            opacity: 1.0,
            attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a> tiles © Aff. Étrangères',
            minZoom: 13,
            maxZoom: 18,
            minNativeZoom: 12,
            maxNativeZoom: 18
        });
        layer_OSMStandard_1;
		map.addLayer (layer_OSMStandard_1)
		
		// carto 10k
        map.createPane('pane_PalermoCTR10K_2');
        map.getPane('pane_PalermoCTR10K_2').style.zIndex = 402;
        var layer_PalermoCTR10K_2 = L.tileLayer('https://siciliahub.github.io/palermohub/carto/ctr_pa_10k/{z}/{x}/{y}.png', {
            pane: 'pane_PalermoCTR10K_2',
            opacity: 1.0,
            attribution: ' <a href="https://www.sitr.regione.sicilia.it/download/download-carta-tecnica-regionale-10000/">Carta Tecnica Regionale 10K | Sicilia ATA 2013, CC BY 4.0</a>',
            minZoom: 13,
            maxZoom: 15,
            minNativeZoom: 13,
            maxNativeZoom: 15
        });
        layer_PalermoCTR10K_2;
        map.addLayer(layer_PalermoCTR10K_2);
		
				// carto favorita 2k
        map.createPane('pane_favorita2k_3');
        map.getPane('pane_favorita2k_3').style.zIndex = 402;
        var layer_favorita2k_3 = L.tileLayer('https://siciliahub.github.io/palermohub/carto/favorita_2k/{z}/{x}/{y}.png', {
            pane: 'pane_favorita2k_3',
            opacity: 1.0,
            attribution: ' <a href="https://www.sitr.regione.sicilia.it/download/download-carta-tecnica-regionale-10000/">Carta Tecnica Comunale 2K | Sicilia ATA 2009, CC BY 4.0</a>',
            minZoom: 16,
            maxZoom: 18,
            minNativeZoom: 16,
            maxNativeZoom: 18
        });
        layer_favorita2k_3;
		 map.addLayer(layer_favorita2k_3);
		 
		 
	 // macro aree
        map.createPane('pane_macro_aree');
        map.getPane('pane_macro_aree').style.zIndex = 402;
        var layer_macro_aree = L.tileLayer('https://palermohub.github.io/Parco_della_Favorita/macro_aree/{z}/{x}/{y}.png', {
            pane: 'pane_macro_aree',
            opacity: 1.0,
            attribution: '',
            minZoom: 13,
            maxZoom: 16,
            minNativeZoom: 13,
            maxNativeZoom: 16
        });
        layer_macro_aree;
		 map.addLayer(layer_macro_aree);	 
		 
		 
		 // studio_fatt
        map.createPane('pane_studio_fatt');
        map.getPane('pane_studio_fatt').style.zIndex = 402;
        var layer_studio_fatt = L.tileLayer('https://palermohub.github.io/PRG2004/p_fatt/{z}/{x}/{y}.png', {
            pane: 'pane_studio_fatt',
            opacity: 1.0,
            attribution: '',
            minZoom: 17,
            maxZoom: 18,
            minNativeZoom: 17,
            maxNativeZoom: 17
        });
        layer_macro_aree;
		 map.addLayer(layer_studio_fatt);	
		 
		 // Area comune bucata
		function pop_area_buco_1(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(String(feature.properties['fid']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_area_buco_1_0() {
            return {
                pane: 'pane_area_buco_1',
                stroke: false, 
                fill: true,
                fillOpacity: .75,
                fillColor: 'rgba(255,255,255,0.7490196078431373)',
                interactive: false,
            }
        }
        map.createPane('pane_area_buco_1');
        map.getPane('pane_area_buco_1').style.zIndex = 9999;
        map.getPane('pane_area_buco_1').style['mix-blend-mode'] = 'normal';
        var layer_area_buco_1 = new L.geoJson(json_area_buco_1, {
            attribution: '',
            interactive: false,
            dataVar: 'json_area_buco_1',
            layerName: 'layer_area_buco_1',
            pane: 'pane_area_buco_1',
            onEachFeature: pop_area_buco_1,
            style: style_area_buco_1_0,
        });
        bounds_group.addLayer(layer_area_buco_1);
     //   map.addLayer(layer_area_buco_1);
        setBounds();	
       
// poligoni studio fattibilità
    function pop_studio_fatt_1(feature, layer) {
        layer.on({
            mouseout: function(e) {
                for (var i in e.target._eventParents) {
                    if (typeof e.target._eventParents[i].resetStyle === 'function') {
                        e.target._eventParents[i].resetStyle(e.target);
                    }
                }
                if (typeof layer.closePopup == 'function') {
                    layer.closePopup();
                } else {
                    layer.eachLayer(function(feature){
                        feature.closePopup()
                    });
                }
            },
            mouseover: highlightFeature,
        });

        layer.bindPopup(function() {
            var macroCls  = feature.properties['Etichetta_MA'] || '';
            var studioCls = feature.properties['classificazione'] || '';
            var fid = Math.round(parseFloat(feature.properties['fid']));
            var areaMq = areaByFid[fid] || 0;
            var areaHa = areaMq > 0
                ? (areaMq / 10000).toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                : '–';
            var macroColor  = MACRO_COLORS[macroCls]  || '#ccc';
            var studioColor = STUDIO_COLORS[studioCls] || '#ccc';
            var swatchStyle = 'display:inline-block;width:13px;height:13px;border-radius:2px;margin-right:5px;vertical-align:middle;border:1px solid rgba(0,0,0,.25);flex-shrink:0;';
            var swatchMacro  = '<span style="' + swatchStyle + 'background:' + macroColor  + ';"></span>';
            var swatchStudio = '<span style="' + swatchStyle + 'background:' + studioColor + ';"></span>';

            var popupContent = '<table>\
                <tr>\
                    <th scope="row">Macro area</th>\
                    <td class="visible-with-data" id="Macro_aree">' + (feature.properties['Macro_aree'] !== null ? swatchMacro + autolinker.link(String(feature.properties['Macro_aree']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Classe</th>\
                    <td class="visible-with-data" id="Etichetta_MA">' + (feature.properties['Etichetta_MA'] !== null ? autolinker.link(String(feature.properties['Etichetta_MA']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row"><hr></th>\
                    <td class="visible-with-data" id="Zonizzazione"><hr></td>\
                </tr>\
                <tr>\
                    <th scope="row">Studio Fattibilità</th>\
                    <td class="visible-with-data" id="Zonizzazione">' + (feature.properties['Zonizzazione'] !== null ? swatchStudio + autolinker.link(String(feature.properties['Zonizzazione']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Classe</th>\
                    <td class="visible-with-data" id="classificazione">' + (feature.properties['classificazione'] !== null ? autolinker.link(String(feature.properties['classificazione']).replace(/'/g, '\'').replace(/"/g, '&quot;').toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Superficie</th>\
                    <td>' + areaHa + ' ha</td>\
                </tr>\
            </table>';

            return removeEmptyRowsFromPopupContent(popupContent, feature);
        }, { maxHeight: 400 });
    }

    function style_studio_fatt_1_0() {
        return {
            pane: 'pane_studio_fatt_1',
            stroke: false,
            fillOpacity: 0,
            interactive: true,
        }
    }

    map.createPane('pane_studio_fatt_1');
    map.getPane('pane_studio_fatt_1').style.zIndex = 401;
    map.getPane('pane_studio_fatt_1').style['mix-blend-mode'] = 'normal';

    var layer_studio_fatt_1 = new L.geoJson(json_studio_fatt_1, {
        attribution: '',
        interactive: true,
        dataVar: 'json_studio_fatt_1',
        layerName: 'layer_studio_fatt_1',
        pane: 'pane_studio_fatt_1',
        onEachFeature: pop_studio_fatt_1,
        style: style_studio_fatt_1_0,
    });

    bounds_group.addLayer(layer_studio_fatt_1);
    map.addLayer(layer_studio_fatt_1);	   
	       // Definizione della funzione setBounds
    function setBounds() {
        if (bounds_group.getLayers().length > 0) {
            map.fitBounds(bounds_group.getBounds());
        }
    }

    // Imposta i limiti della mappa
    setBounds();
    // ===== LEGENDA DINAMICA =====
    (function() {
        var legendBox = document.getElementById('map-legend');
        var legMacro  = document.getElementById('leg-macro');
        var legStudio = document.getElementById('leg-studio');

        // tooltip automatico: title swatch = testo label sorella
        document.querySelectorAll('.leg-swatch').forEach(function(sw) {
            var label = sw.parentElement.querySelector('.leg-label');
            if (label) sw.title = label.textContent.trim();
        });

        // collapse toggle — unico handler su #map-legend (event delegation)
        var compact = false;
        legendBox.addEventListener('click', function(e) {
            var btn = e.target.closest('.leg-collapse');
            if (!btn) return;
            compact = !compact;
            legendBox.classList.toggle('compact', compact);
            legendBox.querySelectorAll('.leg-collapse').forEach(function(b) {
                b.title     = compact ? 'Espandi legenda' : 'Comprimi ai soli colori';
                b.textContent = compact ? '⊞' : '◧';
            });
        });

        function updateMapLegend() {
            var z = map.getZoom();
            if (z >= 13 && z <= 16) {
                legMacro.style.display  = 'block';
                legStudio.style.display = 'none';
                legendBox.style.display = 'block';
            } else if (z >= 17 && z <= 18) {
                legMacro.style.display  = 'none';
                legStudio.style.display = 'block';
                legendBox.style.display = 'block';
            } else {
                legendBox.style.display = 'none';
            }
        }

        map.on('zoomend', updateMapLegend);
        updateMapLegend();

        // inserisce la legenda nel contenitore Leaflet bottomleft (allineata con la scala)
        var legendControl = L.control({ position: 'bottomleft' });
        legendControl.onAdd = function() {
            var el = document.getElementById('map-legend');
            L.DomEvent.disableClickPropagation(el);
            L.DomEvent.disableScrollPropagation(el);
            return el;
        };
        legendControl.addTo(map);
    })();

		
	  		
		var baseMaps = {};
        var overlaysTree = [
		{label: 'Parco della Favorita  &#x1f5fa;, <div class="leaflet-control-layers-separator"></div>'},
			{label: '<img src="legend/spot.png" /> Area Parco della Favorita', layer: layer_area_buco_1},
        ]
        var lay = L.control.layers.tree(null, overlaysTree,{
            //namedToggle: true,
            //selectorBack: false,
            //closedSymbol: '&#8862; &#x1f5c0;',
            //openedSymbol: '&#8863; &#x1f5c1;',
            //collapseAll: 'Collapse all',
            //expandAll: 'Expand all',
            collapsed: true, 
        });
        lay.addTo(map);
        setBounds();

		
	<!-- plugin accessori -->   
// var bigImage = L.control.bigImage({position: 'topleft'});bigImage.addTo(map);

<!-- scala mappa -->		
	<!-- scala mappa -->		
		var graphicScale = L.control.graphicScale({
		doubleLine: true,
		fill: 'hollow',
        showSubunits: true
	}).addTo(map);
	
	<!-- cronologia -->
new L.HistoryControl({}).addTo(map);	

	<!-- stampa mappa -->
var bigImageControl = L.control.bigImage({position: 'topleft'});
bigImageControl.addTo(map);
	
<!-- muose coordinate -->
L.control.mousePosition().addTo(map);
				<!-- zoomhome - non aggiunto alla mappa, usato dalla toolbar -->
var zoomHome = L.Control.zoomHome();

<!-- scala 1:2000 --> 
L.control.scalefactor().addTo(map);

<!-- credits -->
    credits = L.controlCredits({
        	imageurl: 'images/aqu.png',
          imagealt: 'gbvitrano credits',
        	tooltip: "Rigenerazione funzionale dell'area verde ed attrezzata del Parco della Favorita",
        	width: '45px',
        	height: '45px',
        	expandcontent: 'Interactive mapping<br/>by <a href="https://www.comune.palermo.it/index.php" target="_blank">gbvitrano per Comune di Palermo</a>',
        }).addTo(map);

// ===== TOOLBAR =====
(function() {
    // Slider zoom
    var zoomSliderEl = document.getElementById('tb-zoom-slider');
    noUiSlider.create(zoomSliderEl, {
        start: [13],
        step: 1,
        range: { min: 13, max: 18 },
        orientation: 'horizontal',
        tooltips: false,
        format: { to: function(v){ return Math.round(v); }, from: function(v){ return +v; } },
        pips: {
            mode: 'values',
            values: [14, 15, 16, 17],
            density: 4,
            format: { to: function(v){ return Math.round(v); } }
        }
    });

    function setZoomBadge(z) {
        document.getElementById('tb-zoom-badge').textContent = z;
    }

    zoomSliderEl.noUiSlider.on('update', function(values) {
        map.setZoom(+values[0]);
        setZoomBadge(+values[0]);
    });
    map.on('zoomend', function() {
        var z = map.getZoom();
        zoomSliderEl.noUiSlider.set(z);
        setZoomBadge(z);
    });

    // Home
    document.getElementById('tb-home').addEventListener('click', function() {
        map.setView([38.170, 13.343], 13);
    });

    // Fullscreen
    document.getElementById('tb-fullscreen').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    document.addEventListener('fullscreenchange', function() {
        var icon = document.getElementById('tb-fs-icon');
        icon.className = document.fullscreenElement ? 'fas fa-compress' : 'fas fa-expand';
    });

    // Misure - trigger il controllo nascosto
    document.getElementById('tb-measure').addEventListener('click', function() {
        var btn = document.querySelector('.leaflet-control-measure-toggle');
        if (btn) btn.click();
        this.classList.toggle('active');
    });
    // deseleziona pulsante misure quando si chiude il pannello misure
    document.querySelector('#map').addEventListener('click', function(e) {
        if (e.target.closest && e.target.closest('.leaflet-control-measure') === null &&
            e.target.closest && e.target.closest('#tb-measure') === null) {
            document.getElementById('tb-measure').classList.remove('active');
        }
    });

    // Google Hybrid e OSM sono basi mutualmente esclusive:
    // Google ha z-index 400, OSM ha 401 → se OSM è attivo copre Google.
    // Soluzione: quando Google è ON, OSM viene rimosso e viceversa.
    document.getElementById('tb-google').addEventListener('click', function() {
        if (map.hasLayer(layer_GoogleHybrid_0)) {
            // disattiva Google → riattiva OSM
            map.removeLayer(layer_GoogleHybrid_0);
            map.addLayer(layer_OSMStandard_1);
            document.getElementById('chk-osm').checked = true;
            this.classList.remove('active');
        } else {
            // attiva Google → rimuovi OSM
            map.removeLayer(layer_OSMStandard_1);
            document.getElementById('chk-osm').checked = false;
            map.addLayer(layer_GoogleHybrid_0);
            this.classList.add('active');
        }
    });

    // Basi cartografiche (OSM + CTR) - toggle panel
    document.getElementById('tb-basemap').addEventListener('click', function(e) {
        e.stopPropagation();
        var panel = document.getElementById('tb-basemap-panel');
        var open = panel.style.display === 'block';
        panel.style.display = open ? 'none' : 'block';
        this.classList.toggle('active', !open);
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#tb-basemap-panel') && !e.target.closest('#tb-basemap')) {
            document.getElementById('tb-basemap-panel').style.display = 'none';
            document.getElementById('tb-basemap').classList.remove('active');
        }
    });

    // Toggle layer basi cartografiche (OSM + CTR)
    var baseLayerMap = {
        'chk-osm':    layer_OSMStandard_1,
        'chk-ctr10k': layer_PalermoCTR10K_2,
        'chk-ctr2k':  layer_favorita2k_3
    };
    Object.keys(baseLayerMap).forEach(function(id) {
        document.getElementById(id).addEventListener('change', function() {
            if (this.checked) {
                // se si riattiva OSM, disattiva Google (basi esclusive)
                if (id === 'chk-osm' && map.hasLayer(layer_GoogleHybrid_0)) {
                    map.removeLayer(layer_GoogleHybrid_0);
                    document.getElementById('tb-google').classList.remove('active');
                }
                map.addLayer(baseLayerMap[id]);
            } else {
                map.removeLayer(baseLayerMap[id]);
            }
        });
    });

    // Stato iniziale badge
    setZoomBadge(map.getZoom());

    // Stampa — apre dialogo stampa/PDF del browser
    document.getElementById('tb-print').addEventListener('click', function() {
        window.print();
    });

    // Ricalcola il centro mappa al cambio viewport di stampa
    window.addEventListener('beforeprint', function() {
        var c = map.getCenter(), z = map.getZoom();
        map.invalidateSize(false);
        map.setView(c, z, { animate: false });
    });
    window.addEventListener('afterprint', function() {
        var c = map.getCenter(), z = map.getZoom();
        map.invalidateSize(false);
        map.setView(c, z, { animate: false });
    });
})();

// ===== COLORI LEGENDE (globali, usati anche nei popup) =====
var MACRO_COLORS = {
    A:'#b8d870', B:'#78c850', C:'#8fa88a', D:'#c8b870',
    E:'#e88880', F:'#e8d870', G:'#58d858', PM:'#90e090'
};
var STUDIO_COLORS = {
    A1:'#d8f0d0', A2:'#c0e0b0', A3:'#a8d090', A4:'#c0d898',
    B1:'#e8e0a8', B2:'#d8c030', B3:'#e8e090', B4:'#c8e080',
    C1:'#4a7050', C2:'#48c048', C3:'#98d018', C4:'#a0a888',
    D:'#c8b870',
    E0:'#c03838', E1:'#d86868', E2:'#c8b0a8', E3:'#e8c018', E4:'#b09060',
    F:'#e8d498', G:'#50b850',
    PM1:'#b8e8b8', PM2:'#50a890', PM3:'#88d088', PM4:'#c8b888'
};
var areaByFid = {};

// ===== DATAVIZ =====
var updateDV;
(function() {
    var MACRO_LABELS = {
        A:'Giardini ornamentali', B:'Aree agricole', C:'Formazioni boschive',
        D:'Viali e percorsi', E:'Edifici e costruito', F:'Impianti sportivi',
        G:'Vivaio comunale', PM:'Parco nel Parco'
    };
    var STUDIO_LABELS = {
        A1:'Giardini storici – restauro filologico', A2:'Giardini storici – restauro con flora esistente',
        A3:'Giardini di nuovo impianto', A4:'Giardino storico con coltivi',
        B1:'Aree agricole storiche', B2:'Aree policolturali di pregio',
        B3:'Aree agricole da riordinare', B4:'Aree agricole museali/didattiche',
        C1:'Macchia, gariga e prateria', C2:'Impianti artificiali storici da recuperare',
        C3:'Aree incolte da rinaturalizzare', C4:'Impianti artificiali per la fruizione',
        D:'Viali, sentieri e percorsi',
        E0:'Area archeologica', E1:'Edifici di pregio storico-monumentale',
        E2:'Edilizia rurale riconvertibile', E3:'Edilizia precaria da demolire',
        E4:'Edifici storici militari', F:'Impianti sportivi', G:'Vivaio comunale',
        PM1:'Giardini polivalenti per la fruizione', PM2:'Giardini agroforestali',
        PM3:'Giardini di nuovo impianto', PM4:'Parcheggio alberato'
    };

    var dvChart = null;
    var macroData = null, studioData = null;

    function parseCSV(text) {
        var lines = text.trim().split('\n');
        var headers = lines[0].split(',').map(function(h){ return h.trim(); });
        return lines.slice(1).map(function(line) {
            var fields = [], inQ = false, cur = '';
            for (var i = 0; i < line.length; i++) {
                var c = line[i];
                if (c === '"') { inQ = !inQ; }
                else if (c === ',' && !inQ) { fields.push(cur); cur = ''; }
                else { cur += c; }
            }
            fields.push(cur);
            var obj = {};
            headers.forEach(function(h, i){ obj[h] = (fields[i]||'').trim(); });
            return obj;
        });
    }

    function aggregate(rows, keyCol) {
        var agg = {};
        rows.forEach(function(r) {
            var k = r[keyCol]; if (!k) return;
            agg[k] = (agg[k]||0) + parseFloat(r['superfici km2']||0);
        });
        return agg;
    }

    function renderChart(aggData, colors, labels) {
        var keys = Object.keys(aggData).sort();
        var vals = keys.map(function(k){ return aggData[k]; });
        var total = vals.reduce(function(a,b){ return a+b; }, 0);
        var totalHa = (total/10000).toFixed(1);

        document.getElementById('dv-center-value').textContent =
            parseFloat(totalHa).toLocaleString('it-IT');

        var ctx = document.getElementById('dv-chart').getContext('2d');
        if (dvChart) { dvChart.destroy(); dvChart = null; }

        dvChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: keys.map(function(k){ return labels[k]||k; }),
                datasets: [{
                    data: vals.map(function(v){ return +(v/10000).toFixed(2); }),
                    backgroundColor: keys.map(function(k){ return colors[k]||'#ccc'; }),
                    borderWidth: 1, borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                cutout: '68%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(c) {
                                var pct = ((c.raw/(total/10000))*100).toFixed(1);
                                return ' '+c.raw.toLocaleString('it-IT')+' ha ('+pct+'%)';
                            }
                        }
                    }
                }
            }
        });

        // Legend
        var leg = document.getElementById('dv-legend');
        leg.innerHTML = '';
        keys.forEach(function(k) {
            var ha = (aggData[k]/10000).toFixed(1);
            var pct = ((aggData[k]/total)*100).toFixed(1);
            var bw = Math.round((aggData[k]/total)*100);
            var col = colors[k]||'#ccc';
            var d = document.createElement('div');
            d.className = 'dv-leg-item';
            d.innerHTML =
                '<span class="dv-leg-dot" style="background:'+col+'"></span>'+
                '<span class="dv-leg-lbl" title="'+(labels[k]||k)+'">'+(labels[k]||k)+'</span>'+
                '<span class="dv-leg-bar-wrap"><span class="dv-leg-bar" style="width:'+bw+'%;background:'+col+'"></span></span>'+
                '<span class="dv-leg-val">'+parseFloat(ha).toLocaleString('it-IT')+'</span>'+
                '<span class="dv-leg-pct">'+pct+'%</span>';
            leg.appendChild(d);
        });

        // Ranking top 5
        var sorted = keys.slice().sort(function(a,b){ return aggData[b]-aggData[a]; });
        var maxV = aggData[sorted[0]];
        var rank = document.getElementById('dv-rank-list');
        rank.innerHTML = '';
        sorted.slice(0,5).forEach(function(k,i) {
            var ha = (aggData[k]/10000).toFixed(1);
            var bw = Math.round((aggData[k]/maxV)*100);
            var col = colors[k]||'#ccc';
            var d = document.createElement('div');
            d.className = 'dv-rank-item';
            d.innerHTML =
                '<span class="dv-rank-num">'+(i+1)+'</span>'+
                '<span class="dv-rank-lbl" title="'+(labels[k]||k)+'">'+(labels[k]||k)+'</span>'+
                '<span class="dv-rank-bar-wrap"><span class="dv-rank-bar" style="width:'+bw+'%;background:'+col+'"></span></span>'+
                '<span class="dv-rank-val">'+parseFloat(ha).toLocaleString('it-IT')+' ha</span>';
            rank.appendChild(d);
        });
    }

    updateDV = function() {
        if (!macroData || !studioData) return;
        var z = map.getZoom();
        var isMacro = (z <= 16);
        document.getElementById('dv-title').textContent = isMacro ? 'MACRO AREE' : 'CLASSI STUDIO FATTIBILITÀ';
        document.getElementById('dv-zoom-info').textContent = isMacro ? 'zoom 13–16' : 'zoom 17–18';
        renderChart(isMacro ? macroData : studioData,
                    isMacro ? MACRO_COLORS : STUDIO_COLORS,
                    isMacro ? MACRO_LABELS : STUDIO_LABELS);
    };

    fetch('dati/aree.csv')
        .then(function(r){ return r.text(); })
        .then(function(text) {
            var rows = parseCSV(text);
            rows.forEach(function(r) {
                areaByFid[Math.round(parseFloat(r.fid))] = parseFloat(r['superfici km2'] || 0);
            });
            macroData  = aggregate(rows, 'etichetta_macroarea');
            studioData = aggregate(rows, 'etichetta_studio');
            updateDV();
            map.on('zoomend', updateDV);
        })
        .catch(function(e){ console.error('DataViz:', e); });
})();


