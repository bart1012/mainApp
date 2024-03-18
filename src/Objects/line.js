import { Line, BufferGeometry, LineBasicMaterial} from "three";

function createLines(points){
    const material = new LineBasicMaterial({
        color: 'orange'
    });
    
    const geometry = new BufferGeometry().setFromPoints( points );
    
    const line = new Line( geometry, material );

    return line
}

export {createLines};