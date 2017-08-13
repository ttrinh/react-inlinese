***
#### Basic Usage
```js
const onSubmit = value => console.log(value);
const shortText = 'This text is editable inside italic tag';
const longText = 'It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text.';
<div>
    <p>
        <i>
            <InlineEditable
                onSubmit={onSubmit}
                value={shortText}
            >
                {shortText}
            </InlineEditable>
        </i>
        . diet aliquam leo, sed consequat lectus auctor et.
    </p>
    <p>
        <b>
            <InlineEditable
                onSubmit={onSubmit}
                value={longText}
            >
                {longText}
            </InlineEditable>
        </b>

        Proin id arcu accumsan, volutpat nunc quis, rhoncus diam. Ut dictum est ac elit vestibulum, posuere convallis augue iaculis. Vivamus imperdiet aliquam leo, sed consequat lectus auctor et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
</div>
```

***