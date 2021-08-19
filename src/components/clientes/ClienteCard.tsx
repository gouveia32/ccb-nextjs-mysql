import { IClienteCard } from "src/Cliente.interface"
import { useRouter } from 'next/router'
import {
  Tr,
  Td,
} from "@chakra-ui/react"

import {
  Button,
  useDisclosure,
} from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

export default function ClienteCard({ item, customContainerClassName }: IClienteCard) {
  const { isOpen: isDeleteUmOpen, onOpen: onDeleteUmOpen, onClose: onDeleteUmClose } = useDisclosure()
  const { isOpen: isDeleteTodosOpen, onOpen: onDeleteTodosOpen, onClose: onDeleteTodosClose } = useDisclosure()
  const router = useRouter()
  
  return (
    <>
      <Tr key={`${item.nome}${item.id}`} style={{ alignContent: 'center' }}>
        <Td>
          <p>{item.id}</p>
        </Td>
        <Td align="left">
          <p>{item.nome}</p>
        </Td>
        <Td align="left">
          <p>{item.telefone1}</p>
        </Td>
        <Td>
          <p>{item.telefone1}</p>
        </Td>
        <Td>
          <Button colorScheme="teal" size="xs" mr='2' onClick={() => router.push(`/cliente/edit/${item.id}`)}>Alterar</Button>
          {/* Delete Um */}
          <Button colorScheme="red" size="xs" onClick={onDeleteUmOpen}>
            Apagar
          </Button>
          <Modal isOpen={isDeleteUmOpen} onClose={onDeleteUmClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Apagar: </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Tem certeza ?
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onDeleteUmClose}>Não</Button>
                <Button colorScheme="red" onClick={() => { }}>
                  Apagar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Td>
      </Tr>
    </>
  )
}