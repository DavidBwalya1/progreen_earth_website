// maps.js — lightweight Leaflet initialisation and district markers
// Notes: district locations are approximate centroids and are labelled as such in popups.

(function(){
    if(typeof L === 'undefined'){
        console.warn('Leaflet not loaded — map will not initialise.');
        return;
    }

    // Center map roughly on Western Province, Zambia
    var map = L.map('projectMap', {scrollWheelZoom:false}).setView([-15.8, 23.0], 7);

    // OpenStreetMap tiles (CDN)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Project markers — district level (approximate coordinates). Popups indicate approximation.
    var projects = [
        {
            district: 'Mongu',
            lat: -15.633, lng: 23.283,
            desc: 'Impuls Africa portfolio presence — community restoration & livestock interventions.'
        },
        {
            district: 'Senanga',
            lat: -16.116, lng: 22.620,
            desc: 'Community engagement and rangeland management activities.'
        },
        {
            district: 'Sesheke',
            lat: -17.476, lng: 24.307,
            desc: 'Cross-border landscape coordination and restoration.'
        },
        {
            district: 'Mwandi',
            lat: -17.300, lng: 24.200,
            desc: 'Local grazing improvements and household support.'
        },
        {
            district: 'Livingstone',
            lat: -17.855, lng: 25.854,
            desc: 'Pilot landscape and stakeholder coordination.'
        },
        {
            district: 'Kalumbila',
            lat: -13.300, lng: 24.067,
            desc: 'Landscape restoration and technical assistance.'
        },
        {
            district: 'Kasempa',
            lat: -13.425, lng: 25.780,
            desc: 'Community regenerative grazing and capacity building.'
        },
        {
            district: 'Mwinilunga',
            lat: -11.736, lng: 24.432,
            desc: 'Early-stage engagement and landscape mapping.'
        },
        {
            district: 'Sioma',
            lat: -17.470, lng: 22.680,
            desc: 'Restoration work near Sioma Falls and riparian areas.'
        }
    ];

    var contactHtml = '<div style="font-weight:700;margin-bottom:6px;">Impuls Africa / Project Presence</div>' +
                      '<div style="font-size:0.95rem;line-height:1.3;">Contact: <a href="mailto:renier@impuls.africa">renier@impuls.africa</a><br/>Phone: +260 96 849 3432</div>';

    projects.forEach(function(p){
        var marker = L.marker([p.lat, p.lng]).addTo(map);
        var popup = '<div style="max-width:240px;"><strong>' + p.district + ' (district)</strong>' +
                    '<p style="margin:0.35rem 0 0.6rem;font-size:0.95rem;">' + p.desc + '</p>' +
                    '<div style="font-size:0.85rem;color:#444;">Location: approximate district centroid</div>' +
                    '<hr style="margin:0.6rem 0;">' + contactHtml + '</div>';
        marker.bindPopup(popup);
    });

    // Fit map bounds to markers with padding
    var group = new L.featureGroup(projects.map(function(p){ return L.marker([p.lat, p.lng]); }));
    map.fitBounds(group.getBounds(), {padding:[40,40], maxZoom:9});

})();
