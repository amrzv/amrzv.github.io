$(function () {
    const property = 'hc-key';

    const visited_countries = [
        'at',  // Austria
        'be',  // Belgium
        'ch',  // Switzerland
        'cz',  // Czech Republic
        'de',  // Germany
        'es',  // Spain
        'fr',  // France
        'gb',  // Britain
        'hr',  // Croatia
        'hu',  // Hungary
        'it',  // Italy
        'nl',  // Netherlands
        'ro',  // Romania
        'sm',  // San Marino
        'th',  // Thailand
        'tr',  // Turkey
        'ua',  // Ukraine
        'va',  // Vatican
        'ru',  // Russia
        'pl',  // Poland
        'sk',  // Slovakia
        'bg',  // Bulgaria
        'mt',  // Monte Carlo
    ]
/*
    const visited_states_in_india = [
        'in-2984',  // Gujarat
        'in-ap',  // Andhra Pradesh
        'in-br',  // Bihar
        'in-ch',  // Chandigarh
        'in-dl',  // Delhi
        'in-ga',  // Goa
        'in-hp',  // Himachal Pradesh
        'in-hr',  // Haryana
        'in-jh',  // Jharkhand
        'in-jk',  // Jammu and Kashmir
        'in-ka',  // Karnataka
        'in-mh',  // Maharashtra
        'in-or',  // Orissa
        'in-pb',  // Punjab
        'in-rj',  // Rajasthan
        'in-tn',  // Tamil Nadu
        'in-up',  // Uttar Pradesh
        'in-ut',  // Utrakhand
        'in-wb'  // West Bengal
    ]

    const visited_states_in_us = [
        // 16/50
        'us-ca',  // California
        'us-dc',  // DC
        'us-fl',  // Florida
        'us-ga',  // Georgia
        'us-il',  // Illinois
        'us-ma',  // Massachusetts
        'us-md',  // Maryland
        'us-mn',  // Minnesota
        'us-oh',  // Ohio
        'us-nj',  // New Jersey
        'us-ny',  // New York
        'us-nc',  // North Carolina
        'us-nv',  // Nevada
        'us-pa',  // Pennsylvania
        'us-ri',  // Rhode Island
        'us-va'   // Virginia
    ];
*/
    function getDrilldown(data, visited) {
        $.each(data, function(i) {
            this.value = visited.indexOf(this.properties[property]);
        });
        return data;
    }

    // Fetch data
    var world_data =  Highcharts.geojson(Highcharts.maps['custom/world']);

//    var us_data =  Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
//    var india_data =  Highcharts.geojson(Highcharts.maps['countries/in/custom/in-all-disputed']);
//    console.log(india_data);

    // Set drilldown pointers
    $.each(world_data, function (i) {
/*
        if (this.properties[property] == 'us') {
            this.drilldown = getDrilldown(
                us_data,
                visited_states_in_us);
            this.drilldownLabel = 'United States of America (States Visited: ' + visited_states_in_us.length + ')';
        }
        
        else if (this.properties[property] == 'in') {
            this.drilldown = getDrilldown(
                india_data,
                visited_states_in_india);
            this.drilldownLabel = 'India';
        }
*/
        this.value = visited_countries.indexOf(this.properties[property]);
    });

    // Instanciate the map
    $('#container').highcharts('Map', {
        chart: {
            spacingBottom: 20,
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var chart = this;
                        var data = e.point.drilldown;
                        var label = e.point.drilldownLabel;

                        chart.addSeriesAsDrilldown(e.point, {
                            name: label,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{point.name}'
                            }
                        });
                    }
                    chart.setTitle(null, { text: label });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'World' });
                }
            }
        },
        title : {
            text : 'Travel',
        },

        subtitle: {
            text: 'Countries Visited: ' + visited_countries.length,
        },

        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            dataClasses: [{
                from: -100,
                to: 0,
                color: '#E5F5E0',
                name: 'Not yet visited'
            }, {
                from: 0,
                to: 100,
                color: '#31A354',
                name: 'Visited'
            }]
        },

        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },

        series : [{
            name: 'World',
            data: world_data,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}'
            }
        }],

        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
});
