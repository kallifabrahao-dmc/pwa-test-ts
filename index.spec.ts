import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { useRespostasApi } from './index'
import { addCeToast } from '@comercti/vue-components'
import type { AxiosError } from 'axios'

vi.mock('@comercti/vue-components', () => ({
  addCeToast: vi.fn(),
}))

describe('useRespostasApi', () => {
  let originalLocation: Location

  beforeEach(() => {
    vi.useFakeTimers()
    originalLocation = window.location
    ///@ts-ignore
    delete window.location
    ///@ts-ignore
    window.location = { href: '' } as Location
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    ///@ts-ignore
    window.location = originalLocation
  })

  it('dispara toast de sucesso para status 200', () => {
    useRespostasApi(200, 'Operação bem-sucedida')
    expect(addCeToast).toHaveBeenCalledWith(
      'Sucesso',
      'Operação bem-sucedida',
      'success',
      5000,
      null,
    )
  })

  it('dispara toast de sucesso para status 201', () => {
    useRespostasApi(201, 'Criado com sucesso')
    expect(addCeToast).toHaveBeenCalledWith('Sucesso', 'Criado com sucesso', 'success', 5000, null)
  })

  it('dispara toast de erro e redireciona para /login para status 401', () => {
    useRespostasApi(401, 'Não autenticado')

    expect(addCeToast).toHaveBeenCalledWith('Erro', 'Usuário não autenticado!', 'error', 5000, null)

    vi.advanceTimersByTime(2000)
    expect(window.location.href).toBe('/login')
  })

  it('dispara toast de erro para status 404', () => {
    useRespostasApi(404, 'Não encontrado')
    expect(addCeToast).toHaveBeenCalledWith(
      'Erro',
      'Não encontrado. Tente novamente!',
      'error',
      5000,
      null,
    )
  })

  it('dispara toast com erros formatados para status 422', () => {
    const error422 = {
      response: {
        data: {
          errors: {
            nome: ['Nome é obrigatório'],
            email: ['Email inválido'],
          },
          message: 'Erro de validação',
        },
      },
    } as AxiosError

    useRespostasApi(422, 'Erro de validação', error422)

    expect(addCeToast).toHaveBeenCalled()
    const [titulo, mensagemHtml] = (addCeToast as any).mock.calls[0]

    expect(titulo).toBe('Erro')
    expect(mensagemHtml).toContain('Nome é obrigatório')
    expect(mensagemHtml).toContain('Email inválido')
  })

  it('dispara toast com mensagem do backend para status 500', () => {
    const error500 = {
      response: {
        data: {
          message: 'Erro interno do servidor',
        },
      },
    } as AxiosError

    useRespostasApi(500, 'Erro interno', error500)
    expect(addCeToast).toHaveBeenCalledWith('Erro', 'Erro interno do servidor', 'error', 5000, null)
  })

  it('dispara o default se status não for tratado', () => {
    useRespostasApi(999, 'Código desconhecido')
    expect(addCeToast).toHaveBeenCalledWith(
      'Erro',
      'Algo deu errado. Tente novamente mais tarde.',
      'error',
      5000,
      null,
    )
  })
})
