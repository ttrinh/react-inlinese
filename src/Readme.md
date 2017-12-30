### Another Inline Edit.. Jeez
```jsx
<div style={{ fontSize: '2em', lineHeight: '1.9' }}>
    <p>
        <ReactInlinese
            onSubmit={value => alert(value)}
            value="Editable text, Editable text, Editable text, Editable text,"
        >
            Editable text, Editable text, Editable text, Editable text,
        </ReactInlinese>
        . diet aliquam leo, sed consequat lectus auctor et.
    </p>
    <p>
        <b>
            <ReactInlinese
                onSubmit={value => alert(value)}
                value="It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. "
                primaryColor="#E5786D"
                submitText=""
                cancelText=""
            >
                It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text. It works with long line of text.
            </ReactInlinese>
        </b>
        Proin id arcu accumsan, volutpat nunc quis, rhoncus diam.
    </p>
    <p>
        Sed consequat lectus auctor et.
        <ReactInlinese
            onSubmit={value => alert(value)}
            value="Editable text is somewhere in the paragraph"
        >
            Editable text is somewhere in the paragraph
        </ReactInlinese>
        . diet aliquam leo, sed consequat lectus auctor et.
    </p>
</div>
```

### Let's style it
```jsx
<p>
    <ReactInlinese
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
    </ReactInlinese>
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
* This is where the input can be manipulated, formatted, and limited..

```jsx
<p>
    <ReactInlinese
        onSubmit={value => alert(value)}
        value="this formatter doesn't accept dollar sign"
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
    </ReactInlinese>
</p>
```

### How about button or else?
```jsx
<div>

    <ReactInlinese
        onSubmit={value => alert(value)}
        value="This is a value different from the button."
        showEditIcon={false}
        hoverStyleString=""
    >
        <button style={{ cursor: 'pointer' }}>BUTTON HERE 😄</button>
    </ReactInlinese>
    <ReactInlinese
        onSubmit={value => alert(value)}
        value="Space OPM"
        showEditIcon={false}
        hoverStyleString=""
        style={{ display: 'inline-block' }}
    >
        <img src="http://www.doppelme.com/images/examples/fade2.gif" />
    </ReactInlinese>

</div>
```


### No buttons please
```jsx
<p>
    <ReactInlinese
        onSubmit={value => alert(value)}
        value=""
        placeholder="..placeholder"
        showButtons={false}

    >
        I am not a button fan
    </ReactInlinese>
</p>
```

### Need it disabled.. duh
```jsx
<p>
    <ReactInlinese
        onSubmit={value => alert(value)}
        value="we all want this"
        showButtons={false}
        disabled

    >
        We all want this
    </ReactInlinese>
</p>
```

### TODO FEATURES
* Simplify theming
* Simplify style strings
* Window view determines Input Box dimension

### DEV
```jsx static
INSTALL DEPENDENCIES
`yarn`

DEV (Run Documentation)
`yarn start`

TEST
`yarn test`

BUILD (Package & Build Documentation)
`yarn build`
```
