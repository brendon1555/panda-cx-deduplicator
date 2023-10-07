# :panda_face: PandaCSS `cx` replacement with deduplication of atomic classes

A drop in replacement for the PandaCSS `cx` function with deduplication of atomic classes (when paired with @brendon1555/panda-preset-unique-utilities)

## :rotating_light: PLEASE READ! :rotating_light:

- This function DOES NOT work if you have enabled the `hash` option in your PandaCSS configuration. Once hashed, the property names are no longer available to be deduplicated.
- This function requires the `@brendon1555/panda-preset-unique-utilities` preset to be added to your PandaCSS configuration. This ensures the atomic classes are unique and can be deduplicated.
- Avoid using underscores in any _non_ atomic class names. This is due to the way this function identifies atomic classes. (The built in `__` in slot recipes is fine)

## Installation

```bash
# npm
npm install -D @brendon1555/panda-cx-deduplicator

# yarn
yarn add -D @brendon1555/panda-cx-deduplicator

# pnpm
pnpm add -D @brendon1555/panda-cx-deduplicator
```

## Usage

- Add the `@brendon1555/panda-preset-unique-utilities` preset to your PandaCSS configuration (`panda.config.ts`). Check it out [here](https://github.com/brendon1555/panda-preset-unique-utilities).  
- Import and use the `cx` function from `@brendon1555/panda-cx-deduplicator` instead of the one from PandaCSS.


```tsx
import { cx } from '@brendon1555/panda-cx-deduplicator';
import { css } from '../styled-system/css'
 
const styles = css({
  borderRadius: '8px',
  paddingX: '12px',
  paddingY: '24px'
})
 
const Card = ({ className, ...props }) => {
  return <div className={cx('group', styles, className)} {...props} />
}


const App = () => {
    return (
        <>
            <Card />
            <Card className={css({ paddingX: '6px' })} />
            <Card paddingX='8px' paddingY='12px' />
            <Card css={{ paddingX: '20px', bg: 'red.200' }} />
        </>
    )
}

// Output
// <div class="group rounded_8px px_12px py_24px"></div>
// <div class="group rounded_8px px_6px py_24px"></div>
// <div class="group rounded_8px px_8px py_12px"></div>
// <div class="group rounded_8px px_20px py_24px bg_red.200"></div>

```