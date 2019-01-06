function Parent() {
    const [item, setItem] = useState({ name: "item", value: 0 });

    const handleChangeItem = () => {
        const newValue = item.value + 1;
        setItem({ ...item, value: newValue });
    };

    return <Child item={item} changeItem={handleChangeItem} />;
}

const Child = React.memo(function Child({ item, changeItem }) {
    function handleClick(){
        changeItem();
    }
    return (
        <div>
            Name: {item.name} Value: {item.value}
            <button onClick={handleClick}>change state in parent</button>
        </div>
    );
});