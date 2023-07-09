import powerbiVisualsApi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class DataParser{
    private static values: powerbiVisualsApi.DataViewMetadataColumn[];
    private static categories: powerbiVisualsApi.DataViewMetadataColumn[];
    private static axisValues: powerbiVisualsApi.DataViewMatrixNode[];
    private static valueSource: powerbiVisualsApi.DataViewMetadataColumn[];
    private static xAxisObj;

    public static update(options: VisualUpdateOptions){
        console.log('options', options);
        
        this.values = [];
        this.categories = [];
        this.axisValues = [];
        this.valueSource = [];
        this.xAxisObj = {};

        const dataViews = options.dataViews;
        if(dataViews && dataViews[0]){

            if(dataViews[0].matrix?.rows?.root?.children){
                this.axisValues = dataViews[0].matrix?.rows?.root?.children;
                this.valueSource = dataViews[0].matrix?.valueSources;
            }

            if(dataViews[0].metadata?.columns?.length){
                const columns = options.dataViews[0].metadata.columns;
                columns.forEach(column => {
                    if(column.roles['value']){
                        this.values.push(column);
                    } else if(column.roles['category']){
                        this.categories.push(column);
                    }
                })
            }
        }
    }

    // {xValues: array string} xAxis as an object 
    private static generateChartData(){
        // this.axisValues.forEach(axis=>{
        //     const label = axis.value;
        //     this.xAxisObj[label] = {label, }
        // })
    }
}