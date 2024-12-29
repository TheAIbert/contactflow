package io.contactflow.contactapi.service;

import io.contactflow.contactapi.domain.Contact;
import io.contactflow.contactapi.repo.ContactRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static io.contactflow.contactapi.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Slf4j
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
@Service
public class ContactService {

    private final ContactRepository contactRepository;


    public Page<Contact> getAllContacts(int page, int size) {
        log.info("Getting all contacts.");
        return contactRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Contact getContact(String id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found."));
    }

    public Contact createContact(Contact contact) {
        log.info("Creating new contact.");
        return contactRepository.save(contact);
    }

    public void deleteContact(String id) {
        log.info("Deleting contact by provided ID: {}.", id);
        contactRepository.findById(id)
                .ifPresentOrElse(
                        contact -> {
                            deletePhoto(contact.getPhotoUrl());
                            contactRepository.delete(contact);
                        },
                        () -> { throw new RuntimeException("Content not found."); }
                );
    }

    public void deletePhoto(String photoUrl) {
        try {
            // Extracting file name from URL.
            String filename = Paths.get(new URI(photoUrl).getPath()).getFileName().toString();
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            Path filePath = fileStorageLocation.resolve(filename);

            // Deleting file if it exists.
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("Image deleted: {}", filename);
            } else {
                log.warn("Image not found: {}", filename);
            }

        } catch (Exception exception) {
            throw new RuntimeException("Unable to delete image.");
        }
    }

    public String uploadPhoto(String id, MultipartFile file) {
        log.info("Saving picture for user by provided ID: {}.", id);
        Contact contact = getContact(id);
        String photoUrl = photoFunction.apply(id, file);
        contact.setPhotoUrl(photoUrl);
        contactRepository.save(contact);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
            .orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());

        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();

            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }

            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);

            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("api/contacts/image/" + filename).toUriString();

        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image.");
        }
    };
}

