import React from 'react';

import { ModalProps } from '@project/components';

export type useCentreModalReturn = [React.FC<ModalProps>, boolean, () => void, () => void];

export type useQueryModalReturn = [React.FC<ModalProps>, boolean, () => void];
