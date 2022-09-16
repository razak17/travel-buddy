import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	children: React.ReactNode;
	lat?: number;
	lng?: number;
};

const Marker = ({ children, ...props }: DivProps) => {
	return <div {...props}>{children}</div>;
};

export default Marker;
