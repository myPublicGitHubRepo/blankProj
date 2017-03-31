function getOlStyles() {
    return olStyles = {
        ovalStyle :  new  ol.style.Style({             //geometry: new ol.geom.Circle([0, 0], 10),    
            image:  new  ol.style.Icon({                
                anchor:  [0.5,  0.5],
                anchorXUnits:   'fraction',
                anchorYUnits:   'fraction',
                opacity:  1.0,
                src:  cordova.file.applicationDirectory  +  'www/images/oval.png',
                //size: [50, 50]    
                scale: 0.35
            }),
        }),

        arrowStyle :  new  ol.style.Style({             //geometry: new ol.geom.Circle([0, 0], 10),    
            image:  new  ol.style.Icon({                
                anchor:  [0.5,  1],
                anchorXUnits:   'fraction',
                anchorYUnits:   'fraction',
                opacity:  1.0,
                src:  cordova.file.applicationDirectory  +  'www/images/arrow.png',
                rotateWithView: true,
                scale: 0.35     
            }),
        }),
        bigArrowStyle :  new  ol.style.Style({             //geometry: new ol.geom.Circle([0, 0], 10),    
            image:  new  ol.style.Icon({                
                anchor:  [0.5,  1],
                anchorXUnits:   'fraction',
                anchorYUnits:   'fraction',
                opacity:  1.0,
                src:  cordova.file.applicationDirectory  +  'www/images/bigArrow.png',
                rotateWithView: true,
                scale: 0.35     
            }),
        }),
         

        arrowStyleRotate :  new  ol.style.Style({             //geometry: new ol.geom.Circle([0, 0], 10),    
            image:  new  ol.style.Icon({                
                anchor:  [0.5,  1],
                anchorXUnits:   'fraction',
                anchorYUnits:   'fraction',
                opacity:  1.0,
                src:  cordova.file.applicationDirectory  +  'www/images/arrow.png',
                rotateWithView: false,
                rotation: 0,
                scale: 0.35     
            }),
        }),

        accuracyStyle: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.3)'
            }),
            stroke: new ol.style.Stroke({
                width: 2,
                color: 'rgba(255, 255, 255, 1)'
            })
        })
    }
}