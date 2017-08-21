### Another Inline Edit
```jsx
<div>
    <p>
        <InlineEditable
            onSubmit={value => alert(value)}
            value="Editable text, Editable text, Editable text, Editable text,"
        >
            Editable text, Editable text, Editable text, Editable text,
        </InlineEditable>
        . diet aliquam leo, sed consequat lectus auctor et.
    </p>
    <p>
        <b>
            <InlineEditable
                onSubmit={value => alert(value)}
                value="It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. "
                primaryColor="#E5786D"
                submitText=""
                cancelText=""
            >
                It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text.
            </InlineEditable>
        </b>
        Proin id arcu accumsan, volutpat nunc quis, rhoncus diam.
    </p>
</div>
```

### Let's style it
```jsx
<p>
    <InlineEditable
        onSubmit={value => alert(value)}
        value="Do you want some tacos?"
        primaryColor="orange"
        secondaryColor="yellow"
        hoverStyleString="color: yellow; background-color: orange;"
        roundness="10px"
        submitText="Sure"
        cancelText="No Taco"
    >
        Do you want some tacos?
    </InlineEditable>
</p>
```

### Format text on change

```js static
const formatMyText = (value) => {
    // .. do some formatter
    return formattedValue;
}
```

* Formatter:Function
* Passed down argument: value
* Must return a string
* This is where the input can be manipulated

```jsx
<p>
    <InlineEditable
        onSubmit={value => alert(value)}
        value="this formatter doesn't accept dollar sign"
        roundness="0px"
        formatter={
            (value) => {
                if (value.match(/\$/)) {
                    return value.replace(/\$/g, '');
                } else {
                    return value;
                }
            }
        }
    >
        this formatter doesn't accept dollar sign
    </InlineEditable>
</p>
```

### How about a button? And of course, No Edit Icon needed.
```jsx
<p>
    <InlineEditable
        onSubmit={value => alert(value)}
        value="This is a value different from the button."
        showEditIcon={false}
    >
        <button style={{ cursor: 'pointer' }}>BUTTON HERE 😄</button>
    </InlineEditable>
    <InlineEditable
        onSubmit={value => alert(value)}
        value=""
        showEditIcon={false}
        placeholder="Enter your value"
    >
        <button style={{ cursor: 'pointer' }}>PLACEHOLDER</button>
    </InlineEditable>
</p>
```


### No buttons please
```jsx
<p>
    <InlineEditable
        onSubmit={value => alert(value)}
        value="I am not a button fan"
        showButtons={false}

    >
        I am not a button fan
    </InlineEditable>
</p>
```

### Need it disabled.. duh
```jsx
<p>
    <InlineEditable
        onSubmit={value => alert(value)}
        value="we all want this"
        showButtons={false}
        disabled

    >
        We all want this
    </InlineEditable>
</p>
```

### POSSIBLE FEATURES
* Autoexpand
* Window view determines Input Box dimension
* Tab support
