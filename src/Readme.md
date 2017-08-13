***
#### Basic Usage
```js
// const DemoContainer = require('../DemoContainer').default;
const onSubmit = value => console.log('value');
<div>
    <p>
        <i>
            <InlineEditable
                onSubmit={onSubmit}
                value="This text is editable inside <i> tag"
            />
        </i>
        . diet aliquam leo, sed consequat lectus auctor et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p>
        <b>
            <InlineEditable
                onSubmit={onSubmit}
                value="It works with long paragraph. It works with long paragraph. It works with long paragraph. It works with long paragraph. "
            />
        </b>

        Proin id arcu accumsan, volutpat nunc quis, rhoncus diam. Ut dictum est ac elit vestibulum, posuere convallis augue iaculis. Vivamus imperdiet aliquam leo, sed consequat lectus auctor et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
</div>
```

***