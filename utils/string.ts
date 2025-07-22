export const generateRandomAuthorName = (includeMiddleName: boolean = false): string => {
  const firstNames = [
    'James', 'Emma', 'William', 'Olivia', 'Benjamin', 'Sophia',
    'Lucas', 'Isabella', 'Henry', 'Charlotte', 'Alexander', 'Amelia'
  ];

  const middleNames = [
    'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'J.', 'K.', 'L.', 'M.'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia',
    'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Wilson'
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  if (includeMiddleName) {
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    return `${firstName} ${middleName} ${lastName}`;
  }

  return `${firstName} ${lastName}`;
}