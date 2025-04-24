package com.desafioVotacaoBackend.desafioVotacaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafioVotacaoBackend.desafioVotacaoBackend.model.Associado;
import com.desafioVotacaoBackend.desafioVotacaoBackend.model.Pauta;
import com.desafioVotacaoBackend.desafioVotacaoBackend.model.Voto;
import com.desafioVotacaoBackend.desafioVotacaoBackend.repository.AssociadoRepository;
import com.desafioVotacaoBackend.desafioVotacaoBackend.repository.VotoRepository;

@Service
public class VotoService {
    @Autowired
    private VotoRepository repository;
    @Autowired
    private AssociadoRepository associadoRepository;

    @Autowired
    private PautaService pautaService;

    public Voto registrarVoto(Long pautaId, Long idAssociado, Voto.VotoOpcao opcao) {
        if (!pautaService.verificarSessaoAtiva(pautaId)) {
            throw new RuntimeException("Sessão de votação não está ativa para esta pauta");
        }

        Pauta pauta = pautaService.buscarPautaPorId(pautaId)
                .orElseThrow(() -> new RuntimeException("Pauta não encontrada"));

        if (verificarAssociadoJaVotou(pautaId, idAssociado)) {
            throw new RuntimeException("Associado já votou nesta pauta");
        }

        Associado associado = associadoRepository.findById(idAssociado)
                .orElseThrow(() -> new RuntimeException("Associado não encontrado"));

        Voto voto = new Voto();
        voto.setPauta(pauta);
        voto.setAssociado(associado);
        voto.setOpcao(opcao);
        voto.setDataVoto(LocalDateTime.now());

        return repository.save(voto);
    }

    public boolean verificarAssociadoJaVotou(Long pautaId, Long idAssociado) {
        Pauta pauta = pautaService.buscarPautaPorId(pautaId)
                .orElseThrow(() -> new RuntimeException("Pauta não encontrada"));

        List<Voto> votos = repository.findAll().stream()
                .filter(v -> v.getPauta().getId().equals(pautaId) &&
                        v.getAssociado().getId().equals(idAssociado))
                .collect(Collectors.toList());

        return !votos.isEmpty();
    }

    public Map<String, Long> contabilizarResultado(Long pautaId) {
        List<Voto> votos = repository.findAll().stream()
                .filter(v -> v.getPauta().getId().equals(pautaId))
                .collect(Collectors.toList());

        return votos.stream()
                .collect(Collectors.groupingBy(
                        v -> v.getOpcao().name(),
                        Collectors.counting()));
    }

}
