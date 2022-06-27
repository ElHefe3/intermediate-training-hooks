import { ChildrenProps } from '@project/types';

export interface ModalProps extends ChildrenProps {
  isOpen?: boolean;
  onClose: () => void;
  afterClose?: () => void;
}
