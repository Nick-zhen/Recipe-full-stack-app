export default function InputText(props) {
    return (
        <div>
            <label>{props.name}:</label><br/>
            <textarea 
                value={props.value}
                rows={props.rows} 
                onChange={(event) => {
                    props.onChange(event);
                }}
            /><br/>
        </div>
    );
}