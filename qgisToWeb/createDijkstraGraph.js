

        //console.log(json_Merged_23.features);
        //get unique Stations
        var stationMap = [];
        for(var k = 0; k < json_Merged_23.features.length; k++){
            var station = json_Merged_23.features[k].properties;

            if(!containsStationWithName(stationMap, station.name)){
                stationMap[station.name] = [];
                var mapEntry = stationMap[station.name];
                mapEntry["name"] = station.name;
                mapEntry["posibleConnections"]=[];
            }
            var mapEntry = stationMap[station.name];
            if(station.Her_Statio != null){
                var connection = [];
                connection["Station"] = station.Her_Statio;
                connection["Length"] = station.Her_length;
                connection["Linie"] = station.layer;
                mapEntry.posibleConnections.push(connection)
            }
            if(station.Hin_Statio != null){
                var connection = [];
                connection["Station"] = station.Hin_Statio;
                connection["Length"] = station.Hin_length;
                connection["Linie"] = station.layer;
                mapEntry.posibleConnections.push(connection)
            }
        }

        console.log(stationMap);

        function containsStationWithName(array, obj) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name === obj) {
                    return true;
                }
            }
            return false;
        }
