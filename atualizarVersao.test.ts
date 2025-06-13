import { describe, it, vi, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useAtualizarVersao } from './useAtualizarVersao'

vi.mock('virtual:pwa-register/vue', () => ({
  useRegisterSW: vi.fn(() => ({
    offlineReady: ref(false),
    needRefresh: ref(false),
    updateServiceWorker: vi.fn(),
  })),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useAtualizarVersao', () => {
  it('deve retornar os refs offlineReady e needRefresh com os valores iniciais falsos', () => {
    const { offlineReady, needRefresh } = useAtualizarVersao()
    expect(offlineReady.value).toBe(false)
    expect(needRefresh.value).toBe(false)
  })

  it('deve retornar a função updateServiceWorker', () => {
    const { updateServiceWorker } = useAtualizarVersao()
    expect(typeof updateServiceWorker).toBe('function')
  })

  it('deve retornar um título vazio quando offlineReady e needRefresh forem falsos', () => {
    const { titulo } = useAtualizarVersao()
    expect(titulo.value).toBe('')
  })

  it('deve retornar o título correto quando offlineReady for true', () => {
    const { titulo, offlineReady } = useAtualizarVersao()
    offlineReady.value = true
    expect(titulo.value).toBe('Aplicativo pronto para funcionar offline')
  })

  it('deve retornar o título correto quando needRefresh for true', () => {
    const { titulo, needRefresh, offlineReady } = useAtualizarVersao()
    offlineReady.value = false
    needRefresh.value = true
    expect(titulo.value).toBe(
      'Novo conteúdo disponível, clique no botão recarregar para atualizar.',
    )
  })

  it('deve chamar updateServiceWorker quando updateServiceWorker for invocado', () => {
    const { updateServiceWorker } = useAtualizarVersao()
    updateServiceWorker()
    expect(updateServiceWorker).toHaveBeenCalled()
  })

  it('deve fechar o modal ao chamar fecharModal', () => {
    const { fecharModal, offlineReady, needRefresh } = useAtualizarVersao()
    offlineReady.value = true
    needRefresh.value = true
    fecharModal()
    expect(offlineReady.value).toBe(false)
    expect(needRefresh.value).toBe(false)
  })

  it('não deve chamar fetch se estiver offline', async () => {
    const swUrl = 'mock-sw-url'
    const mockRegistration = {
      update: vi.fn(),
    } as unknown as ServiceWorkerRegistration

    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
    })

    const periodo = 1000
    const { registrarSincPeriodica } = useAtualizarVersao()

    registrarSincPeriodica(swUrl, mockRegistration)

    await new Promise((resolve) => setTimeout(resolve, periodo + 100))

    expect(global.fetch).not.toHaveBeenCalled()
    expect(mockRegistration.update).not.toHaveBeenCalled()
  })
})
