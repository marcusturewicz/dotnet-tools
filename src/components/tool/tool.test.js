import React from 'react';
import { render } from '@testing-library/react';
import Tool from './tool';

test('renders tool text correctly', () => {
    const props = {
        id: 'Company.Product.Tool',
        description: 'Really sick .NET tools',
        iconUrl: 'www.example.com/image.png',
        version: '1.0.0',
        totalDownloads: 10000,
        authors: ['Me', 'You', 'Them']
    }

    const { getByText } = render(<Tool value={props} />);

    const packageElement = getByText('Company.Product.Tool');
    const descriptionElement = getByText('Really sick .NET tools');
    const versionElement = getByText('1.0.0');
    const authorsElement = getByText('Me, You, Them');
    const downloadsElement = getByText('10,000 total downloads');
    const nugetLink = getByText('View on NuGet').closest('a');

    expect(packageElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(versionElement).toBeInTheDocument();
    expect(authorsElement).toBeInTheDocument();
    expect(downloadsElement).toBeInTheDocument();
    expect(nugetLink).toHaveAttribute('href', 'https://nuget.org/packages/Company.Product.Tool')

});

test('long description is truncated', () => {
    const props = {
        id: 'Company.Product.Tool',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                     'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
                     'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        iconUrl: 'www.example.com/image.png',
        version: '1.0.0',
        totalDownloads: 10000,
        authors: ['Me', 'You', 'Them']
    }

    const { getByText } = render(<Tool value={props} />);

    const descriptionElement = getByText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                                         'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
                                         'when an unknown printer took a galley of type a...');

    expect(descriptionElement).toBeInTheDocument();
});
