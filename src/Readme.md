#### Basic Usage
```js
const onSubmit = value => alert(value);
const shortText = 'Editable text, Editable text, Editable text, Editable text,';
const longText = 'It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. ';
<div>
    <p>
        <InlineEditable
            onSubmit={onSubmit}
            value={shortText}
        >
            {shortText}
        </InlineEditable>
        . diet aliquam leo, sed consequat lectus auctor et.
    </p>
    <p>
        <b>
            <InlineEditable
                onSubmit={onSubmit}
                value={longText}
                primaryColor="#E5786D"
            >
                {longText}
            </InlineEditable>
        </b>
        Proin id arcu accumsan, volutpat nunc quis, rhoncus diam.
    </p>
</div>
```
