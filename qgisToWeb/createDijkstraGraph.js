
        console.log(json_AlleStationen_23.features);
        //get unique Stations
        var stationMap = new Map();
        for(var k = 0; k < json_AlleStationen_23.features.length; k++){
            var station = json_AlleStationen_23.features[k].properties;

            if(stationMap.get(station.name) === undefined){
                stationMap.set(station.name, {});
                var mapEntry = stationMap.get(station.name);
                mapEntry["name"] = station.name;
                mapEntry["posibleConnections"] = [];
            }

            var mapEntry = stationMap.get(station.name);
            if(station.Her_Statio != null){
                var connection = {};
                connection["Station"] = station.Her_Statio;
                connection["Length"] = station.Her_length;
                connection["Linie"] = station.layer;
                mapEntry.posibleConnections.push(connection);
            }
            if(station.Hin_Statio != null){
                var connection = {};
                connection["Station"] = station.Hin_Statio;
                connection["Length"] = station.Hin_length;
                connection["Linie"] = station.layer;
                mapEntry.posibleConnections.push(connection);
            }
        }

        console.log(stationMap);

        var graph = new Graph();
        console.log(stationMap.size);
        for (var [key, value] of stationMap) {
            var tmp = {};
            for(var m = 0;m < value.posibleConnections.length; m++){
                tmp[value.posibleConnections[m].Station.toString()] = value.posibleConnections[m].Length;
            }
            graph.add(key, tmp);
        }

        console.log(graph);
        console.log(graph.findShortestPath('Wilhelm-Kaisen-Brücke', 'Domsheide'));