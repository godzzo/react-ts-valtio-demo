import tw from 'tailwind-styled-components';

export const TwButton = tw.div<{ primary: boolean }>`
    ${(p) => (p.primary ? 'bg-indigo-700' : 'bg-yellow-500')}
    ${(p) => (p.primary ? 'hover:bg-indigo-400' : 'hover:bg-yellow-300')}

    flex
    inline-flex
    items-center
    border
    border-transparent
    text-xs
    font-medium
    rounded-2xl
    shadow-sm
    text-white
	px-4
	cursor-pointer

    focus:outline-none
`;
