import { ChildrenProps } from '@project/types';

export type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  afterClose?: () => void;
} & ChildrenProps;
