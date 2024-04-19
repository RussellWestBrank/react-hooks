import useTimer from './index';

const MessageItem: React.FC<{MessageProps}> = (item) => {
    const {onMouseEnter,onMouseLeave,} = useTimer({
        id: item.id,
        duration: 2000,
        remove: item.onClose,
    });

    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {item.content}
    </div>
}

export default MessageItem;