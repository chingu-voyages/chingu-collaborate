import { ButtonGroup, Button } from '@chakra-ui/react'

export default function Pagination({ page, onChange, totalProjectPages }) {
    const clickHandler = (event) => onChange(event.target.value)

    const { pageRange: range, selectedPage } = page

    return (
        <ButtonGroup variant="outline" spacing={2} size="sm" paddingBottom={10}>
            {/* Should be disabled if selected page is at 1 */}
            {selectedPage > 1 && (
                <Button
                    onClick={clickHandler}
                    backgroundColor="white"
                    value={selectedPage - 1}
                >{`<`}</Button>
            )}
            {range?.map((number) => (
                <Button
                    key={number}
                    colorScheme={selectedPage == number ? 'green' : 'gray'}
                    onClick={clickHandler}
                    value={number}
                >
                    {number}
                </Button>
            ))}
            {/* Should be disabled if selected page is at max*/}
            {selectedPage < totalProjectPages && (
                <Button
                    onClick={clickHandler}
                    backgroundColor="white"
                    value={Number(selectedPage) + 1}
                >{`>`}</Button>
            )}
        </ButtonGroup>
    )
}
